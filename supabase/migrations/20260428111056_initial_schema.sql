-- ================================================================
-- THS-2 — Initial schema + RLS
-- Source of truth: Investment Portal Blueprint, Section D.
-- (Section H is "Retool vs Custom App" and is NOT the schema.)
--
-- Locked decisions (Terry, 2026-04-28):
--   - All 23 Section D tables included. No cost_events.
--   - Section D names exclusively (watchlist_tickers, investment_memos, audit_logs).
--   - RLS enabled on every table (23 of 23).
--     - 17 user-owned: auth.uid() = user_id, EXISTS-subquery on child tables.
--       (Child tables: watchlist_tickers, agent_outputs, memo_versions,
--        trigger_events, decision_logs, thesis_checkpoints — RLS via parent.)
--     - 6 public-read (tickers, companies, data_sources, price_snapshots,
--       fundamentals_snapshots, source_documents): SELECT USING (true) only;
--       writes restricted to service_role (which bypasses RLS).
--   - workflow_runs has no user_id column (Section D as-written). Phase 1 is
--     single-user — RLS policy permits any authenticated role; tighten when
--     multi-tenant lands.
--   - users → auth.users sync trigger included so FK references resolve on
--     magic-link signup. (Schema-layer wiring, not auth code.)
-- ================================================================


-- ================================================================
-- FUNCTIONS
-- ================================================================

-- Shared updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sync auth.users → public.users on signup so FK references resolve.
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ================================================================
-- TABLES (topological order so FKs resolve cleanly)
-- ================================================================

-- ---------- USERS ----------
CREATE TABLE users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  display_name  TEXT,
  settings      JSONB NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_users_email ON users(email);

-- ---------- TICKERS ----------
CREATE TABLE tickers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol        TEXT NOT NULL UNIQUE,
  exchange      TEXT NOT NULL,
  asset_class   TEXT NOT NULL DEFAULT 'equity',
  active        BOOLEAN NOT NULL DEFAULT true,
  polygon_id    TEXT,
  fmp_symbol    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_tickers_symbol ON tickers(symbol);

-- ---------- COMPANIES ----------
CREATE TABLE companies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker_id     UUID NOT NULL UNIQUE REFERENCES tickers(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  sector        TEXT,
  industry      TEXT,
  description   TEXT,
  website       TEXT,
  employees     INTEGER,
  market_cap    BIGINT,
  country       TEXT DEFAULT 'US',
  ipo_date      DATE,
  sic_code      TEXT,
  cik           TEXT,
  raw_profile   JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- DATA_SOURCES ----------
CREATE TABLE data_sources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,
  base_url        TEXT NOT NULL,
  tier            TEXT,
  monthly_cost    NUMERIC(10,2),
  last_healthy_at TIMESTAMPTZ,
  last_error_at   TIMESTAMPTZ,
  last_error_msg  TEXT,
  rate_limit_rpm  INTEGER,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- WATCHLISTS ----------
CREATE TABLE watchlists (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  description  TEXT,
  is_default   BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_watchlists_user_id ON watchlists(user_id);

-- ---------- WATCHLIST_TICKERS ----------
CREATE TABLE watchlist_tickers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  watchlist_id    UUID NOT NULL REFERENCES watchlists(id) ON DELETE CASCADE,
  ticker_id       UUID NOT NULL REFERENCES tickers(id) ON DELETE CASCADE,
  target_price    NUMERIC(12,4),
  stop_loss       NUMERIC(12,4),
  thesis_summary  TEXT,
  conviction      SMALLINT CHECK (conviction BETWEEN 1 AND 10),
  position_size   NUMERIC(5,4),
  added_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (watchlist_id, ticker_id)
);
CREATE INDEX idx_wt_watchlist ON watchlist_tickers(watchlist_id);
CREATE INDEX idx_wt_ticker    ON watchlist_tickers(ticker_id);

-- ---------- PRICE_SNAPSHOTS ----------
CREATE TABLE price_snapshots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker_id   UUID NOT NULL REFERENCES tickers(id) ON DELETE CASCADE,
  snapshot_at TIMESTAMPTZ NOT NULL,
  open        NUMERIC(12,4) NOT NULL,
  high        NUMERIC(12,4) NOT NULL,
  low         NUMERIC(12,4) NOT NULL,
  close       NUMERIC(12,4) NOT NULL,
  volume      BIGINT NOT NULL,
  vwap        NUMERIC(12,4),
  source      TEXT NOT NULL DEFAULT 'polygon',
  UNIQUE (ticker_id, snapshot_at)
);
CREATE INDEX idx_ps_ticker_time ON price_snapshots(ticker_id, snapshot_at DESC);

-- ---------- FUNDAMENTALS_SNAPSHOTS ----------
CREATE TABLE fundamentals_snapshots (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker_id          UUID NOT NULL REFERENCES tickers(id) ON DELETE CASCADE,
  period             TEXT NOT NULL,
  period_end_date    DATE NOT NULL,
  revenue            BIGINT,
  gross_profit       BIGINT,
  operating_income   BIGINT,
  net_income         BIGINT,
  eps                NUMERIC(10,4),
  eps_estimate       NUMERIC(10,4),
  free_cash_flow     BIGINT,
  pe_ratio           NUMERIC(10,4),
  ev_ebitda          NUMERIC(10,4),
  ev_revenue         NUMERIC(10,4),
  price_to_book      NUMERIC(10,4),
  gross_margin       NUMERIC(8,6),
  operating_margin   NUMERIC(8,6),
  net_margin         NUMERIC(8,6),
  revenue_growth_yoy NUMERIC(8,6),
  debt_to_equity    NUMERIC(10,4),
  current_ratio     NUMERIC(10,4),
  raw_data          JSONB,
  source            TEXT NOT NULL DEFAULT 'fmp',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (ticker_id, period_end_date, source)
);
CREATE INDEX idx_fund_ticker_date ON fundamentals_snapshots(ticker_id, period_end_date DESC);

-- ---------- TRIGGERS ----------
-- Reordered before research_jobs because research_jobs has FK to triggers.
CREATE TABLE triggers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  description   TEXT,
  conditions    JSONB NOT NULL,
  severity      TEXT NOT NULL DEFAULT 'medium',
  active        BOOLEAN NOT NULL DEFAULT true,
  applies_to    TEXT NOT NULL DEFAULT 'watchlist',
  auto_research BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_triggers_user_active ON triggers(user_id, active);

-- ---------- RESEARCH_JOBS ----------
CREATE TABLE research_jobs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id),
  ticker_id      UUID NOT NULL REFERENCES tickers(id),
  trigger_id     UUID REFERENCES triggers(id),
  status         TEXT NOT NULL DEFAULT 'queued',
  inngest_run_id TEXT,
  started_at     TIMESTAMPTZ,
  completed_at   TIMESTAMPTZ,
  error_message  TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_rj_ticker_status ON research_jobs(ticker_id, status);
CREATE INDEX idx_rj_user           ON research_jobs(user_id);

-- ---------- AGENT_OUTPUTS ----------
CREATE TABLE agent_outputs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_job_id UUID NOT NULL REFERENCES research_jobs(id) ON DELETE CASCADE,
  agent_name      TEXT NOT NULL,
  model_used      TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  input_tokens    INTEGER,
  output_tokens   INTEGER,
  cost_usd        NUMERIC(10,6),
  output          JSONB,
  raw_response    TEXT,
  error           TEXT,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ao_job       ON agent_outputs(research_job_id);
CREATE INDEX idx_ao_agent_job ON agent_outputs(agent_name, research_job_id);

-- ---------- INVESTMENT_MEMOS ----------
CREATE TABLE investment_memos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_job_id UUID NOT NULL UNIQUE REFERENCES research_jobs(id),
  ticker_id       UUID NOT NULL REFERENCES tickers(id),
  user_id         UUID NOT NULL REFERENCES users(id),
  status          TEXT NOT NULL DEFAULT 'draft',
  title           TEXT NOT NULL,
  summary         TEXT,
  recommendation  TEXT,
  conviction      SMALLINT CHECK (conviction BETWEEN 1 AND 10),
  target_price    NUMERIC(12,4),
  time_horizon    TEXT,
  body_md         TEXT,
  trigger_context JSONB,
  price_at_memo   NUMERIC(12,4),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_memo_ticker_status ON investment_memos(ticker_id, status);
CREATE INDEX idx_memo_user          ON investment_memos(user_id, created_at DESC);

-- ---------- MEMO_VERSIONS ----------
CREATE TABLE memo_versions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memo_id     UUID NOT NULL REFERENCES investment_memos(id) ON DELETE CASCADE,
  version     INTEGER NOT NULL,
  body_md     TEXT NOT NULL,
  changed_by  UUID NOT NULL REFERENCES users(id),
  change_note TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (memo_id, version)
);
CREATE INDEX idx_mv_memo ON memo_versions(memo_id, version DESC);

-- ---------- TRIGGER_EVENTS ----------
CREATE TABLE trigger_events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger_id       UUID NOT NULL REFERENCES triggers(id),
  ticker_id        UUID NOT NULL REFERENCES tickers(id),
  fired_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  snapshot_id      UUID REFERENCES price_snapshots(id),
  condition_values JSONB NOT NULL,
  severity         TEXT NOT NULL,
  resolved         BOOLEAN NOT NULL DEFAULT false,
  resolved_at      TIMESTAMPTZ,
  research_job_id  UUID REFERENCES research_jobs(id)
);
CREATE INDEX idx_te_trigger    ON trigger_events(trigger_id, fired_at DESC);
CREATE INDEX idx_te_ticker     ON trigger_events(ticker_id, fired_at DESC);
CREATE INDEX idx_te_unresolved ON trigger_events(resolved, fired_at DESC) WHERE resolved = false;

-- ---------- DECISIONS ----------
CREATE TABLE decisions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memo_id           UUID NOT NULL REFERENCES investment_memos(id),
  user_id           UUID NOT NULL REFERENCES users(id),
  decision          TEXT NOT NULL,
  conviction        SMALLINT CHECK (conviction BETWEEN 1 AND 10),
  position_size     NUMERIC(5,4),
  price_at_decision NUMERIC(12,4),
  rationale         TEXT NOT NULL,
  decided_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_decisions_memo ON decisions(memo_id);
CREATE INDEX idx_decisions_user ON decisions(user_id, decided_at DESC);

-- ---------- DECISION_LOGS ----------
CREATE TABLE decision_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID NOT NULL REFERENCES decisions(id),
  event_type  TEXT NOT NULL,
  actor_id    UUID NOT NULL REFERENCES users(id),
  metadata    JSONB,
  logged_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_dl_decision ON decision_logs(decision_id, logged_at);

-- ---------- PORTFOLIO_POSITIONS ----------
CREATE TABLE portfolio_positions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  ticker_id   UUID NOT NULL REFERENCES tickers(id),
  decision_id UUID REFERENCES decisions(id),
  quantity    NUMERIC(15,6) NOT NULL,
  avg_cost    NUMERIC(12,4) NOT NULL,
  opened_at   TIMESTAMPTZ NOT NULL,
  closed_at   TIMESTAMPTZ,
  close_price NUMERIC(12,4),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_pp_user_open ON portfolio_positions(user_id, closed_at) WHERE closed_at IS NULL;

-- ---------- ALERTS ----------
CREATE TABLE alerts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id),
  ticker_id  UUID REFERENCES tickers(id),
  source     TEXT NOT NULL,
  source_id  UUID,
  severity   TEXT NOT NULL,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  read_at    TIMESTAMPTZ,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_alerts_user_unread ON alerts(user_id, read, created_at DESC);

-- ---------- SOURCE_DOCUMENTS ----------
CREATE TABLE source_documents (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker_id        UUID NOT NULL REFERENCES tickers(id),
  doc_type         TEXT NOT NULL,
  title            TEXT,
  source_url       TEXT,
  edgar_accession  TEXT,
  content_text     TEXT,
  content_raw      JSONB,
  period_of_report DATE,
  filed_at         TIMESTAMPTZ,
  fetched_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_sd_ticker_type ON source_documents(ticker_id, doc_type, filed_at DESC);

-- ---------- WORKFLOW_RUNS ----------
CREATE TABLE workflow_runs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inngest_run_id TEXT NOT NULL UNIQUE,
  function_name  TEXT NOT NULL,
  event_name     TEXT NOT NULL,
  status         TEXT NOT NULL,
  input          JSONB,
  output         JSONB,
  started_at     TIMESTAMPTZ,
  completed_at   TIMESTAMPTZ,
  error          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_wr_function_status ON workflow_runs(function_name, status);
CREATE INDEX idx_wr_started         ON workflow_runs(started_at DESC);

-- ---------- AUDIT_LOGS ----------
CREATE TABLE audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id),
  action       TEXT NOT NULL,
  entity_type  TEXT,
  entity_id    UUID,
  before_state JSONB,
  after_state  JSONB,
  metadata     JSONB,
  ip_address   INET,
  logged_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_al_user_time   ON audit_logs(user_id, logged_at DESC);
CREATE INDEX idx_al_entity      ON audit_logs(entity_type, entity_id, logged_at DESC);
CREATE INDEX idx_al_action_time ON audit_logs(action, logged_at DESC);

-- ---------- THESES ----------
CREATE TABLE theses (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES users(id),
  ticker_id               UUID NOT NULL REFERENCES tickers(id),
  title                   TEXT NOT NULL,
  body_md                 TEXT NOT NULL,
  bull_case               TEXT,
  bear_case               TEXT,
  key_metrics             JSONB,
  invalidation_conditions JSONB,
  status                  TEXT NOT NULL DEFAULT 'active',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, ticker_id)
);

-- ---------- THESIS_CHECKPOINTS ----------
CREATE TABLE thesis_checkpoints (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id    UUID NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  checked_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  status       TEXT NOT NULL,
  findings_md  TEXT,
  agent_output JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_tc_thesis_date ON thesis_checkpoints(thesis_id, checked_at DESC);


-- ================================================================
-- TRIGGERS
-- ================================================================

-- Sync auth.users → public.users on signup.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();

-- update_updated_at on every table that has updated_at (12 tables).
CREATE TRIGGER trg_updated_at_users               BEFORE UPDATE ON users               FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_tickers             BEFORE UPDATE ON tickers             FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_companies           BEFORE UPDATE ON companies           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_data_sources        BEFORE UPDATE ON data_sources        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_watchlists          BEFORE UPDATE ON watchlists          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_watchlist_tickers   BEFORE UPDATE ON watchlist_tickers   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_triggers            BEFORE UPDATE ON triggers            FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_research_jobs       BEFORE UPDATE ON research_jobs       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_investment_memos    BEFORE UPDATE ON investment_memos    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_portfolio_positions BEFORE UPDATE ON portfolio_positions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_workflow_runs       BEFORE UPDATE ON workflow_runs       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_updated_at_theses              BEFORE UPDATE ON theses              FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================

-- Enable RLS on all 23 tables.
ALTER TABLE users                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickers                ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies              ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources           ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists             ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_tickers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_snapshots        ENABLE ROW LEVEL SECURITY;
ALTER TABLE fundamentals_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE triggers               ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_jobs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_outputs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_memos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_versions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE trigger_events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions              ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_positions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_documents       ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE theses                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE thesis_checkpoints     ENABLE ROW LEVEL SECURITY;


-- ----------------------------------------------------------------
-- PUBLIC-READ POLICIES (6 tables — anyone can SELECT, only service_role writes)
-- ----------------------------------------------------------------
CREATE POLICY "public read tickers"
  ON tickers FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "public read companies"
  ON companies FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "public read data_sources"
  ON data_sources FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "public read price_snapshots"
  ON price_snapshots FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "public read fundamentals_snapshots"
  ON fundamentals_snapshots FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "public read source_documents"
  ON source_documents FOR SELECT TO authenticated, anon USING (true);


-- ----------------------------------------------------------------
-- USER-OWNED POLICIES (17 tables)
-- Pattern: FOR ALL TO authenticated, USING + WITH CHECK on auth.uid().
-- Wrap auth.uid() in (SELECT auth.uid()) per Supabase perf guidance —
-- Postgres caches the result instead of re-evaluating per row.
-- ----------------------------------------------------------------

-- users — auth.uid() = id
CREATE POLICY "users own row"
  ON users FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- watchlists — direct user_id
CREATE POLICY "watchlists owner"
  ON watchlists FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- watchlist_tickers — EXISTS via watchlists
CREATE POLICY "watchlist_tickers owner via watchlist"
  ON watchlist_tickers FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM watchlists w
    WHERE w.id = watchlist_tickers.watchlist_id
      AND w.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM watchlists w
    WHERE w.id = watchlist_tickers.watchlist_id
      AND w.user_id = (SELECT auth.uid())
  ));

-- triggers — direct user_id
CREATE POLICY "triggers owner"
  ON triggers FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- research_jobs — direct user_id
CREATE POLICY "research_jobs owner"
  ON research_jobs FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- agent_outputs — EXISTS via research_jobs
CREATE POLICY "agent_outputs owner via research_job"
  ON agent_outputs FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM research_jobs r
    WHERE r.id = agent_outputs.research_job_id
      AND r.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM research_jobs r
    WHERE r.id = agent_outputs.research_job_id
      AND r.user_id = (SELECT auth.uid())
  ));

-- investment_memos — direct user_id
CREATE POLICY "investment_memos owner"
  ON investment_memos FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- memo_versions — EXISTS via investment_memos
CREATE POLICY "memo_versions owner via memo"
  ON memo_versions FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM investment_memos m
    WHERE m.id = memo_versions.memo_id
      AND m.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM investment_memos m
    WHERE m.id = memo_versions.memo_id
      AND m.user_id = (SELECT auth.uid())
  ));

-- trigger_events — EXISTS via triggers
CREATE POLICY "trigger_events owner via trigger"
  ON trigger_events FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM triggers t
    WHERE t.id = trigger_events.trigger_id
      AND t.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM triggers t
    WHERE t.id = trigger_events.trigger_id
      AND t.user_id = (SELECT auth.uid())
  ));

-- decisions — direct user_id
CREATE POLICY "decisions owner"
  ON decisions FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- decision_logs — EXISTS via decisions
CREATE POLICY "decision_logs owner via decision"
  ON decision_logs FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM decisions d
    WHERE d.id = decision_logs.decision_id
      AND d.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM decisions d
    WHERE d.id = decision_logs.decision_id
      AND d.user_id = (SELECT auth.uid())
  ));

-- portfolio_positions — direct user_id
CREATE POLICY "portfolio_positions owner"
  ON portfolio_positions FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- alerts — direct user_id
CREATE POLICY "alerts owner"
  ON alerts FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- workflow_runs — no user_id; Phase 1 single-user. Permit any authenticated role.
-- TODO Phase 5 multi-tenant: add user_id and replace with auth.uid() = user_id.
CREATE POLICY "workflow_runs phase1 single tenant"
  ON workflow_runs FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- audit_logs — direct user_id; system-write rows (user_id NULL) are service-role only.
CREATE POLICY "audit_logs owner"
  ON audit_logs FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- theses — direct user_id
CREATE POLICY "theses owner"
  ON theses FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- thesis_checkpoints — EXISTS via theses
CREATE POLICY "thesis_checkpoints owner via thesis"
  ON thesis_checkpoints FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM theses th
    WHERE th.id = thesis_checkpoints.thesis_id
      AND th.user_id = (SELECT auth.uid())
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM theses th
    WHERE th.id = thesis_checkpoints.thesis_id
      AND th.user_id = (SELECT auth.uid())
  ));

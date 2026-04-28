export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      agent_outputs: {
        Row: {
          agent_name: string;
          completed_at: string | null;
          cost_usd: number | null;
          created_at: string;
          error: string | null;
          id: string;
          input_tokens: number | null;
          model_used: string;
          output: Json | null;
          output_tokens: number | null;
          raw_response: string | null;
          research_job_id: string;
          started_at: string | null;
          status: string;
        };
        Insert: {
          agent_name: string;
          completed_at?: string | null;
          cost_usd?: number | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          input_tokens?: number | null;
          model_used: string;
          output?: Json | null;
          output_tokens?: number | null;
          raw_response?: string | null;
          research_job_id: string;
          started_at?: string | null;
          status?: string;
        };
        Update: {
          agent_name?: string;
          completed_at?: string | null;
          cost_usd?: number | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          input_tokens?: number | null;
          model_used?: string;
          output?: Json | null;
          output_tokens?: number | null;
          raw_response?: string | null;
          research_job_id?: string;
          started_at?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agent_outputs_research_job_id_fkey";
            columns: ["research_job_id"];
            isOneToOne: false;
            referencedRelation: "research_jobs";
            referencedColumns: ["id"];
          },
        ];
      };
      alerts: {
        Row: {
          body: string;
          created_at: string;
          email_sent: boolean;
          id: string;
          read: boolean;
          read_at: string | null;
          severity: string;
          source: string;
          source_id: string | null;
          ticker_id: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          email_sent?: boolean;
          id?: string;
          read?: boolean;
          read_at?: string | null;
          severity: string;
          source: string;
          source_id?: string | null;
          ticker_id?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          email_sent?: boolean;
          id?: string;
          read?: boolean;
          read_at?: string | null;
          severity?: string;
          source?: string;
          source_id?: string | null;
          ticker_id?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "alerts_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alerts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          action: string;
          after_state: Json | null;
          before_state: Json | null;
          entity_id: string | null;
          entity_type: string | null;
          id: string;
          ip_address: unknown;
          logged_at: string;
          metadata: Json | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          after_state?: Json | null;
          before_state?: Json | null;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          ip_address?: unknown;
          logged_at?: string;
          metadata?: Json | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          after_state?: Json | null;
          before_state?: Json | null;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          ip_address?: unknown;
          logged_at?: string;
          metadata?: Json | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      companies: {
        Row: {
          cik: string | null;
          country: string | null;
          created_at: string;
          description: string | null;
          employees: number | null;
          id: string;
          industry: string | null;
          ipo_date: string | null;
          market_cap: number | null;
          name: string;
          raw_profile: Json | null;
          sector: string | null;
          sic_code: string | null;
          ticker_id: string;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          cik?: string | null;
          country?: string | null;
          created_at?: string;
          description?: string | null;
          employees?: number | null;
          id?: string;
          industry?: string | null;
          ipo_date?: string | null;
          market_cap?: number | null;
          name: string;
          raw_profile?: Json | null;
          sector?: string | null;
          sic_code?: string | null;
          ticker_id: string;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          cik?: string | null;
          country?: string | null;
          created_at?: string;
          description?: string | null;
          employees?: number | null;
          id?: string;
          industry?: string | null;
          ipo_date?: string | null;
          market_cap?: number | null;
          name?: string;
          raw_profile?: Json | null;
          sector?: string | null;
          sic_code?: string | null;
          ticker_id?: string;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "companies_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: true;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
        ];
      };
      data_sources: {
        Row: {
          base_url: string;
          created_at: string;
          id: string;
          last_error_at: string | null;
          last_error_msg: string | null;
          last_healthy_at: string | null;
          monthly_cost: number | null;
          name: string;
          rate_limit_rpm: number | null;
          tier: string | null;
          updated_at: string;
        };
        Insert: {
          base_url: string;
          created_at?: string;
          id?: string;
          last_error_at?: string | null;
          last_error_msg?: string | null;
          last_healthy_at?: string | null;
          monthly_cost?: number | null;
          name: string;
          rate_limit_rpm?: number | null;
          tier?: string | null;
          updated_at?: string;
        };
        Update: {
          base_url?: string;
          created_at?: string;
          id?: string;
          last_error_at?: string | null;
          last_error_msg?: string | null;
          last_healthy_at?: string | null;
          monthly_cost?: number | null;
          name?: string;
          rate_limit_rpm?: number | null;
          tier?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      decision_logs: {
        Row: {
          actor_id: string;
          decision_id: string;
          event_type: string;
          id: string;
          logged_at: string;
          metadata: Json | null;
        };
        Insert: {
          actor_id: string;
          decision_id: string;
          event_type: string;
          id?: string;
          logged_at?: string;
          metadata?: Json | null;
        };
        Update: {
          actor_id?: string;
          decision_id?: string;
          event_type?: string;
          id?: string;
          logged_at?: string;
          metadata?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "decision_logs_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "decision_logs_decision_id_fkey";
            columns: ["decision_id"];
            isOneToOne: false;
            referencedRelation: "decisions";
            referencedColumns: ["id"];
          },
        ];
      };
      decisions: {
        Row: {
          conviction: number | null;
          created_at: string;
          decided_at: string;
          decision: string;
          id: string;
          memo_id: string;
          position_size: number | null;
          price_at_decision: number | null;
          rationale: string;
          user_id: string;
        };
        Insert: {
          conviction?: number | null;
          created_at?: string;
          decided_at?: string;
          decision: string;
          id?: string;
          memo_id: string;
          position_size?: number | null;
          price_at_decision?: number | null;
          rationale: string;
          user_id: string;
        };
        Update: {
          conviction?: number | null;
          created_at?: string;
          decided_at?: string;
          decision?: string;
          id?: string;
          memo_id?: string;
          position_size?: number | null;
          price_at_decision?: number | null;
          rationale?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "decisions_memo_id_fkey";
            columns: ["memo_id"];
            isOneToOne: false;
            referencedRelation: "investment_memos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "decisions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      fundamentals_snapshots: {
        Row: {
          created_at: string;
          current_ratio: number | null;
          debt_to_equity: number | null;
          eps: number | null;
          eps_estimate: number | null;
          ev_ebitda: number | null;
          ev_revenue: number | null;
          free_cash_flow: number | null;
          gross_margin: number | null;
          gross_profit: number | null;
          id: string;
          net_income: number | null;
          net_margin: number | null;
          operating_income: number | null;
          operating_margin: number | null;
          pe_ratio: number | null;
          period: string;
          period_end_date: string;
          price_to_book: number | null;
          raw_data: Json | null;
          revenue: number | null;
          revenue_growth_yoy: number | null;
          source: string;
          ticker_id: string;
        };
        Insert: {
          created_at?: string;
          current_ratio?: number | null;
          debt_to_equity?: number | null;
          eps?: number | null;
          eps_estimate?: number | null;
          ev_ebitda?: number | null;
          ev_revenue?: number | null;
          free_cash_flow?: number | null;
          gross_margin?: number | null;
          gross_profit?: number | null;
          id?: string;
          net_income?: number | null;
          net_margin?: number | null;
          operating_income?: number | null;
          operating_margin?: number | null;
          pe_ratio?: number | null;
          period: string;
          period_end_date: string;
          price_to_book?: number | null;
          raw_data?: Json | null;
          revenue?: number | null;
          revenue_growth_yoy?: number | null;
          source?: string;
          ticker_id: string;
        };
        Update: {
          created_at?: string;
          current_ratio?: number | null;
          debt_to_equity?: number | null;
          eps?: number | null;
          eps_estimate?: number | null;
          ev_ebitda?: number | null;
          ev_revenue?: number | null;
          free_cash_flow?: number | null;
          gross_margin?: number | null;
          gross_profit?: number | null;
          id?: string;
          net_income?: number | null;
          net_margin?: number | null;
          operating_income?: number | null;
          operating_margin?: number | null;
          pe_ratio?: number | null;
          period?: string;
          period_end_date?: string;
          price_to_book?: number | null;
          raw_data?: Json | null;
          revenue?: number | null;
          revenue_growth_yoy?: number | null;
          source?: string;
          ticker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fundamentals_snapshots_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
        ];
      };
      investment_memos: {
        Row: {
          body_md: string | null;
          conviction: number | null;
          created_at: string;
          id: string;
          price_at_memo: number | null;
          recommendation: string | null;
          research_job_id: string;
          status: string;
          summary: string | null;
          target_price: number | null;
          ticker_id: string;
          time_horizon: string | null;
          title: string;
          trigger_context: Json | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body_md?: string | null;
          conviction?: number | null;
          created_at?: string;
          id?: string;
          price_at_memo?: number | null;
          recommendation?: string | null;
          research_job_id: string;
          status?: string;
          summary?: string | null;
          target_price?: number | null;
          ticker_id: string;
          time_horizon?: string | null;
          title: string;
          trigger_context?: Json | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body_md?: string | null;
          conviction?: number | null;
          created_at?: string;
          id?: string;
          price_at_memo?: number | null;
          recommendation?: string | null;
          research_job_id?: string;
          status?: string;
          summary?: string | null;
          target_price?: number | null;
          ticker_id?: string;
          time_horizon?: string | null;
          title?: string;
          trigger_context?: Json | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "investment_memos_research_job_id_fkey";
            columns: ["research_job_id"];
            isOneToOne: true;
            referencedRelation: "research_jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "investment_memos_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "investment_memos_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      memo_versions: {
        Row: {
          body_md: string;
          change_note: string | null;
          changed_by: string;
          created_at: string;
          id: string;
          memo_id: string;
          version: number;
        };
        Insert: {
          body_md: string;
          change_note?: string | null;
          changed_by: string;
          created_at?: string;
          id?: string;
          memo_id: string;
          version: number;
        };
        Update: {
          body_md?: string;
          change_note?: string | null;
          changed_by?: string;
          created_at?: string;
          id?: string;
          memo_id?: string;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "memo_versions_changed_by_fkey";
            columns: ["changed_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memo_versions_memo_id_fkey";
            columns: ["memo_id"];
            isOneToOne: false;
            referencedRelation: "investment_memos";
            referencedColumns: ["id"];
          },
        ];
      };
      portfolio_positions: {
        Row: {
          avg_cost: number;
          close_price: number | null;
          closed_at: string | null;
          created_at: string;
          decision_id: string | null;
          id: string;
          notes: string | null;
          opened_at: string;
          quantity: number;
          ticker_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avg_cost: number;
          close_price?: number | null;
          closed_at?: string | null;
          created_at?: string;
          decision_id?: string | null;
          id?: string;
          notes?: string | null;
          opened_at: string;
          quantity: number;
          ticker_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avg_cost?: number;
          close_price?: number | null;
          closed_at?: string | null;
          created_at?: string;
          decision_id?: string | null;
          id?: string;
          notes?: string | null;
          opened_at?: string;
          quantity?: number;
          ticker_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "portfolio_positions_decision_id_fkey";
            columns: ["decision_id"];
            isOneToOne: false;
            referencedRelation: "decisions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "portfolio_positions_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "portfolio_positions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      price_snapshots: {
        Row: {
          close: number;
          high: number;
          id: string;
          low: number;
          open: number;
          snapshot_at: string;
          source: string;
          ticker_id: string;
          volume: number;
          vwap: number | null;
        };
        Insert: {
          close: number;
          high: number;
          id?: string;
          low: number;
          open: number;
          snapshot_at: string;
          source?: string;
          ticker_id: string;
          volume: number;
          vwap?: number | null;
        };
        Update: {
          close?: number;
          high?: number;
          id?: string;
          low?: number;
          open?: number;
          snapshot_at?: string;
          source?: string;
          ticker_id?: string;
          volume?: number;
          vwap?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "price_snapshots_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
        ];
      };
      research_jobs: {
        Row: {
          completed_at: string | null;
          created_at: string;
          error_message: string | null;
          id: string;
          inngest_run_id: string | null;
          started_at: string | null;
          status: string;
          ticker_id: string;
          trigger_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          inngest_run_id?: string | null;
          started_at?: string | null;
          status?: string;
          ticker_id: string;
          trigger_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          inngest_run_id?: string | null;
          started_at?: string | null;
          status?: string;
          ticker_id?: string;
          trigger_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "research_jobs_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_jobs_trigger_id_fkey";
            columns: ["trigger_id"];
            isOneToOne: false;
            referencedRelation: "triggers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "research_jobs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      source_documents: {
        Row: {
          content_raw: Json | null;
          content_text: string | null;
          created_at: string;
          doc_type: string;
          edgar_accession: string | null;
          fetched_at: string;
          filed_at: string | null;
          id: string;
          period_of_report: string | null;
          source_url: string | null;
          ticker_id: string;
          title: string | null;
        };
        Insert: {
          content_raw?: Json | null;
          content_text?: string | null;
          created_at?: string;
          doc_type: string;
          edgar_accession?: string | null;
          fetched_at?: string;
          filed_at?: string | null;
          id?: string;
          period_of_report?: string | null;
          source_url?: string | null;
          ticker_id: string;
          title?: string | null;
        };
        Update: {
          content_raw?: Json | null;
          content_text?: string | null;
          created_at?: string;
          doc_type?: string;
          edgar_accession?: string | null;
          fetched_at?: string;
          filed_at?: string | null;
          id?: string;
          period_of_report?: string | null;
          source_url?: string | null;
          ticker_id?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "source_documents_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
        ];
      };
      theses: {
        Row: {
          bear_case: string | null;
          body_md: string;
          bull_case: string | null;
          created_at: string;
          id: string;
          invalidation_conditions: Json | null;
          key_metrics: Json | null;
          status: string;
          ticker_id: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          bear_case?: string | null;
          body_md: string;
          bull_case?: string | null;
          created_at?: string;
          id?: string;
          invalidation_conditions?: Json | null;
          key_metrics?: Json | null;
          status?: string;
          ticker_id: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          bear_case?: string | null;
          body_md?: string;
          bull_case?: string | null;
          created_at?: string;
          id?: string;
          invalidation_conditions?: Json | null;
          key_metrics?: Json | null;
          status?: string;
          ticker_id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "theses_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "theses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      thesis_checkpoints: {
        Row: {
          agent_output: Json | null;
          checked_at: string;
          created_at: string;
          findings_md: string | null;
          id: string;
          status: string;
          thesis_id: string;
        };
        Insert: {
          agent_output?: Json | null;
          checked_at?: string;
          created_at?: string;
          findings_md?: string | null;
          id?: string;
          status: string;
          thesis_id: string;
        };
        Update: {
          agent_output?: Json | null;
          checked_at?: string;
          created_at?: string;
          findings_md?: string | null;
          id?: string;
          status?: string;
          thesis_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "thesis_checkpoints_thesis_id_fkey";
            columns: ["thesis_id"];
            isOneToOne: false;
            referencedRelation: "theses";
            referencedColumns: ["id"];
          },
        ];
      };
      tickers: {
        Row: {
          active: boolean;
          asset_class: string;
          created_at: string;
          exchange: string;
          fmp_symbol: string | null;
          id: string;
          polygon_id: string | null;
          symbol: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          asset_class?: string;
          created_at?: string;
          exchange: string;
          fmp_symbol?: string | null;
          id?: string;
          polygon_id?: string | null;
          symbol: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          asset_class?: string;
          created_at?: string;
          exchange?: string;
          fmp_symbol?: string | null;
          id?: string;
          polygon_id?: string | null;
          symbol?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      trigger_events: {
        Row: {
          condition_values: Json;
          fired_at: string;
          id: string;
          research_job_id: string | null;
          resolved: boolean;
          resolved_at: string | null;
          severity: string;
          snapshot_id: string | null;
          ticker_id: string;
          trigger_id: string;
        };
        Insert: {
          condition_values: Json;
          fired_at?: string;
          id?: string;
          research_job_id?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          severity: string;
          snapshot_id?: string | null;
          ticker_id: string;
          trigger_id: string;
        };
        Update: {
          condition_values?: Json;
          fired_at?: string;
          id?: string;
          research_job_id?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          severity?: string;
          snapshot_id?: string | null;
          ticker_id?: string;
          trigger_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trigger_events_research_job_id_fkey";
            columns: ["research_job_id"];
            isOneToOne: false;
            referencedRelation: "research_jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trigger_events_snapshot_id_fkey";
            columns: ["snapshot_id"];
            isOneToOne: false;
            referencedRelation: "price_snapshots";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trigger_events_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trigger_events_trigger_id_fkey";
            columns: ["trigger_id"];
            isOneToOne: false;
            referencedRelation: "triggers";
            referencedColumns: ["id"];
          },
        ];
      };
      triggers: {
        Row: {
          active: boolean;
          applies_to: string;
          auto_research: boolean;
          category: string;
          conditions: Json;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          severity: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          active?: boolean;
          applies_to?: string;
          auto_research?: boolean;
          category: string;
          conditions: Json;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          severity?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          active?: boolean;
          applies_to?: string;
          auto_research?: boolean;
          category?: string;
          conditions?: Json;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          severity?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "triggers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          display_name: string | null;
          email: string;
          id: string;
          settings: Json;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          email: string;
          id: string;
          settings?: Json;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          email?: string;
          id?: string;
          settings?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      watchlist_tickers: {
        Row: {
          added_at: string;
          conviction: number | null;
          id: string;
          position_size: number | null;
          stop_loss: number | null;
          target_price: number | null;
          thesis_summary: string | null;
          ticker_id: string;
          updated_at: string;
          watchlist_id: string;
        };
        Insert: {
          added_at?: string;
          conviction?: number | null;
          id?: string;
          position_size?: number | null;
          stop_loss?: number | null;
          target_price?: number | null;
          thesis_summary?: string | null;
          ticker_id: string;
          updated_at?: string;
          watchlist_id: string;
        };
        Update: {
          added_at?: string;
          conviction?: number | null;
          id?: string;
          position_size?: number | null;
          stop_loss?: number | null;
          target_price?: number | null;
          thesis_summary?: string | null;
          ticker_id?: string;
          updated_at?: string;
          watchlist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "watchlist_tickers_ticker_id_fkey";
            columns: ["ticker_id"];
            isOneToOne: false;
            referencedRelation: "tickers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "watchlist_tickers_watchlist_id_fkey";
            columns: ["watchlist_id"];
            isOneToOne: false;
            referencedRelation: "watchlists";
            referencedColumns: ["id"];
          },
        ];
      };
      watchlists: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          is_default: boolean;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_default?: boolean;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_default?: boolean;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "watchlists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      workflow_runs: {
        Row: {
          completed_at: string | null;
          created_at: string;
          error: string | null;
          event_name: string;
          function_name: string;
          id: string;
          inngest_run_id: string;
          input: Json | null;
          output: Json | null;
          started_at: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          error?: string | null;
          event_name: string;
          function_name: string;
          id?: string;
          inngest_run_id: string;
          input?: Json | null;
          output?: Json | null;
          started_at?: string | null;
          status: string;
          updated_at?: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          error?: string | null;
          event_name?: string;
          function_name?: string;
          id?: string;
          inngest_run_id?: string;
          input?: Json | null;
          output?: Json | null;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;

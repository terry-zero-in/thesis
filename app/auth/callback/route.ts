import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const ALLOWED_NEXT_PATHS = new Set(["/dashboard"]);

function safeNext(value: string | null): string {
  if (!value) return "/dashboard";
  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//") || value.startsWith("/\\")) return "/dashboard";
  if (!ALLOWED_NEXT_PATHS.has(value)) return "/dashboard";
  return value;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));

  if (!code) {
    url.pathname = "/login";
    url.search = "?error=auth_callback_missing_code";
    return NextResponse.redirect(url);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    url.pathname = "/login";
    url.search = "?error=auth_callback_failed";
    return NextResponse.redirect(url);
  }

  url.pathname = next;
  url.search = "";
  return NextResponse.redirect(url);
}

import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const PUBLIC_PATHS = ["/login", "/auth/callback"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (user && pathname === "/login") {
    return redirectWithSessionCookies(request, response, "/dashboard");
  }

  if (!user && !isPublicPath(pathname)) {
    return redirectWithSessionCookies(request, response, "/login");
  }

  return response;
}

// Per @supabase/ssr: when returning a NextResponse other than the one created by
// updateSession (e.g. a redirect), copy any rotated auth cookies from the original
// response onto the new one. Otherwise users get logged out on token rotation.
function redirectWithSessionCookies(
  request: NextRequest,
  source: NextResponse,
  destination: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = destination;
  const redirect = NextResponse.redirect(url);
  for (const cookie of source.cookies.getAll()) {
    redirect.cookies.set(cookie);
  }
  return redirect;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

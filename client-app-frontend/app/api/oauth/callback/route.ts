import { mtlsAgent } from "@/lib/mtlsAgent";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const tokenRes = await fetch("http://localhost:4000/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: body.code,
      agent: mtlsAgent,
      redirect_uri: "http://localhost:3000/callback",
      client_id: "client123",
      code_verifier: body.code_verifier,
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(tokens, { status: 401 });
  }

  // ✅ Store tokens in HTTP-only cookies
  const response = NextResponse.json({ message: "login_successful" });

  response.cookies.set("access_token", tokens.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production
    maxAge: 60 * 15, // 15 minutes
  });

  response.cookies.set("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

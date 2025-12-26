import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    logout_url: "http://localhost:4000/logout",
  });

  response.cookies.set("access_token", "", { maxAge: 0 });
  response.cookies.set("refresh_token", "", { maxAge: 0 });

  return response;
}
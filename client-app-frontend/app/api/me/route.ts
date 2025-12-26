import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = (await cookies()).get("access_token");

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

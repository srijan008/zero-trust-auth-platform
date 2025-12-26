import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";

const AUTH_SERVER = "http://localhost:4000";

export async function getValidAccessToken() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;
  const refreshToken = (await cookieStore).get("refresh_token")?.value;

  if (!accessToken) return null;

  try {
    verifyAccessToken(accessToken); 
  } catch (err: any) {
    if (err.name !== "TokenExpiredError") {
      return null;
    }
  }

  
  if (!refreshToken) return null;

  const res = await fetch(`${AUTH_SERVER}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) return null;

  const tokens = await res.json();

  
  (await cookieStore).set("access_token", tokens.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 15,
  });

  (await cookieStore).set("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
  });

  return tokens.access_token;
}

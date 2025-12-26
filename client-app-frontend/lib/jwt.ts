import jwt from "jsonwebtoken";
import fs from "fs";

const PUBLIC_KEY = fs.readFileSync("./keys/public.pem", "utf8");

export function verifyAccessToken(token: string) {
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ["RS256"],
    issuer: "zero-trust-auth"
  });
}

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import fs from "fs";

const privateKey = fs.readFileSync("./keys/private.pem", "utf8");

export function signAccessToken(payload) {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "15m",
    issuer: "zero-trust-auth",
  });
}
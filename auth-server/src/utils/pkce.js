import crypto from "crypto";

function base64UrlEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeChallenge(verifier) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64UrlEncode(hash);
}

export function verifyPKCE(verifier, storedChallenge) {
  const computed = generateCodeChallenge(verifier);
  // console.log(computed);
  // console.log(storedChallenge);
  return computed === storedChallenge;
}

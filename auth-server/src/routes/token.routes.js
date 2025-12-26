import express from "express";
import { consumeAuthCode } from "../services/code.store.js";
import { verifyPKCE } from "../utils/pkce.js";
import { signAccessToken } from "../utils/jwt.js";
import {
  createRefreshToken,
} from "../services/refresh.store.js";

const router = express.Router();


router.post("/token", (req, res) => {
  const {
    grant_type,
    code,
    redirect_uri,
    client_id,
    code_verifier,
  } = req.body;

  
  if (grant_type !== "authorization_code") {
    return res.status(400).json({ error: "unsupported_grant_type" });
  }

  if (!code || !client_id || !redirect_uri || !code_verifier) {
    return res.status(400).json({ error: "invalid_request" });
  }

  const authCode = consumeAuthCode(code);
  if (!authCode) {
    console.log("Auth code consumed:", authCode);
    return res.status(400).json({ error: "invalid_or_expired_code" });
  }
  // console.log("Auth code consumed:", authCode);
  const user = authCode.userId;
  

  if (!authCode) {
    return res.status(400).json({ error: "invalid_or_expired_code" });
  }

  if (authCode.client_id !== client_id) {
    return res.status(400).json({ error: "invalid_client" });
  }

  if (authCode.redirect_uri !== redirect_uri) {
    return res.status(400).json({ error: "redirect_uri_mismatch" });
  }

  const pkceValid = verifyPKCE(
    code_verifier,
    authCode.code_challenge
  );
  // console.log(code_verifier);
  // console.log(authCode.code_challenge);

  if (!pkceValid) {
    return res.status(400).json({ error: "invalid_pkce" });
  }
  
  const accessToken = signAccessToken({
    sub: user,
    email: authCode.email,
    client_id,
  });
  const sessionId = authCode.sessionId;
  console.log("Creating refresh token for session:", sessionId);

  const refreshToken = createRefreshToken({
      userId: user,
      client_id,
      sessionId,
  });



  
  return res.json({
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: "Bearer",
    expires_in: 900,
  });
});

export default router;

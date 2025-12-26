import express from "express";
import { createAuthCode } from "../services/code.store.js";
import { getSession } from "../services/session.store.js";

const router = express.Router();

router.get("/authorize", (req, res) => {
  const redirect = decodeURIComponent(req.query.redirect);

  const {
    response_type,
    client_id,
    redirect_uri,
    code_challenge,
    code_challenge_method,
    state,
  } = req.query;

  // 1️⃣ Validate OAuth request
  if (response_type !== "code") {
    return res.status(400).json({ error: "unsupported_response_type" });
  }

  if (!client_id || !redirect_uri) {
    return res.status(400).json({ error: "invalid_request" });
  }

  if (!code_challenge || code_challenge_method !== "S256") {
    return res.status(400).json({ error: "invalid_pkce" });
  }

  
  const sessionId = req.cookies.sso_session;
  const session = sessionId ? getSession(sessionId) : null;

  if (!session) {
    return res.redirect(
      `/login?redirect=${encodeURIComponent(req.originalUrl)}`
    );
  }
  // console.log("Session found:", sessionId);
  // console.log("Creating auth code for user:", session.userId);
  const code = createAuthCode({
    client_id,
    redirect_uri,
    code_challenge,
    userId: session.userId,
    sessionId,
  });

  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set("code", code);
  if (state) redirectUrl.searchParams.set("state", state);

  return res.redirect(redirectUrl.toString());
});

export default router;
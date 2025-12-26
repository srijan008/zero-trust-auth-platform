import express from "express";
import {
  consumeRefreshToken,
  createRefreshToken,
} from "../services/refresh.store.js";
import { signAccessToken } from "../utils/jwt.js";
import { getSession } from "../services/session.store.js";

const router = express.Router();

router.post("/refresh", (req, res) => {
  const { refresh_token } = req.body;
  const sessionId = req.cookies.sso_session;

  if (!refresh_token || !sessionId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  
  const session = getSession(sessionId);
  if (!session) {
    return res.status(401).json({ error: "invalid_session" });
  }

  
  const stored = consumeRefreshToken(refresh_token);
  if (!stored) {
    return res.status(401).json({ error: "invalid_refresh_token" });
  }

  
  const accessToken = signAccessToken({
    sub: stored.userId,
    client_id: stored.client_id,
  });

  const newRefreshToken = createRefreshToken({
    userId: stored.userId,
    client_id: stored.client_id,
  });

  return res.json({
    access_token: accessToken,
    refresh_token: newRefreshToken,
    token_type: "Bearer",
    expires_in: 900,
  });
});

export default router;

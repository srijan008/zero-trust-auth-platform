import express from "express";
import { deleteSession } from "../services/session.store.js";
import { revokeSessionTokens } from "../services/refresh.store.js";

const router = express.Router();

router.get("/logout", (req, res) => {
  const sessionId = req.cookies.sso_session;
  console.log("Logout request for session:", sessionId);

  if (!sessionId) {
    return res.status(200).json({ message: "already_logged_out" });
  }

  // 1️⃣ Delete SSO session
  deleteSession(sessionId);

  // 2️⃣ Revoke ALL refresh tokens for this session
  revokeSessionTokens(sessionId);
  console.log("Revoked tokens for session:", sessionId);
  // 3️⃣ Clear cookie
  res.clearCookie("sso_session", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in prod
  });

  return res.status(200).json({
    message: "global_logout_successful",
  });
});

export default router;

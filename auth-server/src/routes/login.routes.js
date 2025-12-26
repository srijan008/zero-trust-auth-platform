import express from "express";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../services/user.store.js";
import { createSession } from "../services/session.store.js";

const router = express.Router();

/**
 * GET /login
 * Shows a simple login form
 */
router.get("/login", (req, res) => {
  const redirect = req.query.redirect || "";
  

  res.send(`
    <html>
      <body>
        <h2>Login</h2>
        <form method="POST" action="/login?redirect=${encodeURIComponent(
          redirect
        )}">
          <input name="email" placeholder="email" required />
          <br/>
          <input name="password" type="password" placeholder="password" required />
          <br/>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

/**
 * POST /login
 * Handles login submission
 */
router.post(
  "/login",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { email, password } = req.body;
    const redirectRaw = req.query.redirect;

    if (!email || !password) {
      return res.status(400).send("Missing credentials");
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).send("Invalid credentials");
    }

    // ✅ Create SSO session
    const sessionId = createSession(user.id);

    res.cookie("sso_session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    // ✅ Decode ONCE and redirect directly
    if (redirectRaw) {
      const redirect = decodeURIComponent(redirectRaw);
      return res.redirect(redirect);
    }

    return res.send("Login successful");
  }
);


export default router;

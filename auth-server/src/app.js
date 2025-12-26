import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

import oauthRoutes from "./routes/oauth.routes.js";
import tokenRoutes from "./routes/token.routes.js";
import refreshRoutes from "./routes/refresh.routes.js";
import logoutRoutes from "./routes/logout.routes.js";
import loginRoutes from "./routes/login.routes.js";
import { requireServiceAuth } from "./middleware/requireServiceAuth.js";
import { rateLimit } from "./middleware/rateLimit.js";

const app = express();

app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));

app.use(
  cors({
    origin: env.CLIENT_ORIGINS,
    credentials: true,
  })
);


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "auth-server",
    timestamp: new Date().toISOString(),
  });
});


app.use("/",rateLimit, oauthRoutes);    // /authorize
app.use("/", requireServiceAuth, rateLimit,  tokenRoutes);    // /token
app.use("/", requireServiceAuth, rateLimit, refreshRoutes);  // /refresh
app.use("/", rateLimit, logoutRoutes);   // /logout
app.use("/", rateLimit, loginRoutes);


export default app;

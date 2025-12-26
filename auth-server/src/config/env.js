import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,

  CLIENT_ORIGINS: [
    "http://localhost:3000", // Next.js client
  ],

  COOKIE_SECRET: process.env.COOKIE_SECRET || "dev-secret",

  JWT_SECRET: process.env.JWT_SECRET || "jwt-secret",

  REDIS_URL: process.env.REDIS_URL || "http://localhost:6379",

  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/authdb",
};

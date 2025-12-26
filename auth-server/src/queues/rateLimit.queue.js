import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const rateLimitQueue = new Queue("rate-limit", {
  connection: redis,
});

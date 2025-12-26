import { Worker } from "bullmq";
import { redis } from "../lib/redis.js";
import { applyLeakyBucket } from "../services/leakyBucket.js";

new Worker(
  "rate-limit",
  async (job) => {
    const { key, capacity, leakRate } = job.data;

    const data = await redis.hgetall(key);

    const state = {
      water: Number(data.water || 0),
      lastLeakTs: Number(data.lastLeakTs || Date.now()),
    };

    const result = applyLeakyBucket(
      state,
      capacity,
      leakRate
    );

    if (!result.allowed) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }

    await redis.hmset(key, {
      water: result.water,
      lastLeakTs: result.lastLeakTs,
    });

    await redis.expire(key, 60);
  },
  { connection: redis }
);

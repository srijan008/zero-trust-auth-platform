import { rateLimitQueue } from "../queues/rateLimit.queue.js";

export async function rateLimit(req, res, next) {
  const ip = req.ip;
  const email = req.user?.email;

  try {
    
    const ipJob = await rateLimitQueue.add("ip", {
      key: `rl:ip:${ip}`,
      capacity: 20,
      leakRate: 5,
    });

    await ipJob.waitUntilFinished(rateLimitQueue.events);

    
    if (email) {
      const userJob = await rateLimitQueue.add("user", {
        key: `rl:user:${email}`,
        capacity: 10,
        leakRate: 2,
      });

      await userJob.waitUntilFinished(rateLimitQueue.events);
    }

    
    next();
  } catch (err) {
    return res.status(429).json({
      error: "too_many_requests",
    });
  }
}

import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  console.error("❌ REDIS_URL is missing in environment variables");
  process.exit(1);
}

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("connect", () => {
  console.log("✅ Redis connected (Railway)");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;

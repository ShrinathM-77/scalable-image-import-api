import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  console.error("❌ REDIS_URL is missing in environment variables");
}

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;

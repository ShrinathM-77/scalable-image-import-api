import Redis from "ioredis";

let redis;

if (process.env.REDIS_PUBLIC_URL) {
  // ✅ Railway Redis
  redis = new Redis(process.env.REDIS_PUBLIC_URL);
  console.log("✅ Using Railway Redis");
} else {
  // ✅ Local Redis (development)
  redis = new Redis("redis://127.0.0.1:6379");
  console.log("⚠️ Using Local Redis");
}

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;

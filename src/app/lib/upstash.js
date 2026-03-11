import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const getFAQs = async() => {
  try {
    const data = await redis.get(process.env.UPSTASH_KEY_FAQ);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch FAQs.");
  }
}
import { Redis } from "ioredis";

export class RedisService {
  // Create a new Redis connection
  static getRedisConnection = (): Redis => {
    const redisConn = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!),
      password: process.env.REDIS_PASSWORD,
    });

    redisConn.on("connect", () => {
      console.log("Connected to Redis");
    });

    redisConn.on("error", (err) => {
      console.log("Error in Redis connection");
    });

    return redisConn;
  };
}

export default RedisService;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import RabbitMQServices from "./services/rabbitMQ";

dotenv.config();

// Routes:
import authRouter from "./routes/auth";
import authorRouter from "./routes/author";
import newsletterRouter from "./routes/newsletter";

// Global Error Handler:
import globalErrorHandler from "./controllers/error";
import RedisService from "./services/redis";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Create a RabbitMQ connection and create a channel:
(async () => {
  // Create a Redis connection:
  const redisClient = await RedisService.getRedisConnection();
  app.set("redisClient", redisClient);

  // Create a RabbitMQ connection and create a channel:
  const rabbitMQConn = await RabbitMQServices.getMQConnection();
  const articleChannel = await RabbitMQServices.createMQChannel(rabbitMQConn);
  app.set("articleChannel", articleChannel);
})();

app.get("/", (req, res) => {
  res.send("Newsletter API server");
});

// Routes:
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/newsletter", newsletterRouter);

// Global Error Handler:
app.use(globalErrorHandler);

// Uncaught Exception:
process.on("uncaughtException", (err: any) => {
  console.log("Uncaught Exception, shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Unhandled Rejection:
process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection, shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

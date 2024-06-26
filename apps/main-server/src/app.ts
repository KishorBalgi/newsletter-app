import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import promClient from "prom-client";
import PrometheusServices from "./services/prometheus";

import RabbitMQServices from "./services/rabbitMQ";
import rabbitMQConfig from "./configs/rabbitMQConfig.json";
import { sleep } from "./utils/general.util";

dotenv.config();

// Routes:
import authRouter from "./routes/auth";
import authorRouter from "./routes/author";
import newsletterRouter from "./routes/newsletter";

// Middlewares:
import { httpReqInterceptor } from "./middlewares/monitoring";

// Global Error Handler:
import globalErrorHandler from "./controllers/error";
import RedisService from "./services/redis";
import AppError from "./utils/AppError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Req interceptor:
app.use((req, res, next) => {
  const req_url = new URL(req.url, `http://${req.headers.host}`);
  console.log(
    `${req.method} ${req_url.pathname} ${req.protocol}://${req.headers.host}`
  );
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Redis Connection:
(async () => {
  // Create a Redis connection:
  const redisClient = await RedisService.getRedisConnection();
  app.set("redisClient", redisClient);
})();

// Rabbit MQ Connection:
(async () => {
  // Create a RabbitMQ connection and create a channel:
  while (true) {
    try {
      const rabbitMQConn = await RabbitMQServices.getMQConnection();
      const articleChannel =
        await RabbitMQServices.createMQChannel(rabbitMQConn);
      app.set("articleChannel", articleChannel);
      break;
    } catch (err: any) {
      console.log(err.message);
      await sleep(rabbitMQConfig.SERVER_OPTIONS.reInitConnDelay);
      console.log("Retrying to connect to RabbitMQ...");
    }
  }
})();

// Prometheus Setup:
const register = new promClient.Registry();
promClient.collectDefaultMetrics({
  register: register,
  prefix: "main_",
});
register.registerMetric(PrometheusServices.http_request_total);
register.registerMetric(PrometheusServices.http_response_rate_histogram);
register.registerMetric(PrometheusServices.nodejs_memory_usage);
register.registerMetric(PrometheusServices.nodejs_cpu_usage);

app.use(httpReqInterceptor);

app.get("/metrics", async (req, res, next) => {
  res.setHeader("Content-type", register.contentType);
  res.send(await register.metrics());
  next();
});

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

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});

// Unhandled Rejection:
process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection, shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

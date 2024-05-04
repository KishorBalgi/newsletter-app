import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import RabbitMQServices from "./services/rabbitMQ";
import rabbitMQConfig from "./configs/rabbitMQConfig.json";
import { sleep } from "./utils/general.util";

import articleWorker from "./workers/articleWorker";
import emailWorker from "./workers/emailWorker";

dotenv.config();

// Routes:

// Global Error Handler:
import globalErrorHandler from "./controllers/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Create a RabbitMQ connection and create a channel:
(async () => {
  while (true) {
    try {
      const rabbitMQConn = await RabbitMQServices.getMQConnection();
      const articleChannel =
        await RabbitMQServices.createMQChannel(rabbitMQConn);
      const emailChannel = await RabbitMQServices.createMQChannel(rabbitMQConn);
      app.set("articleChannel", articleChannel);
      app.set("emailChannel", emailChannel);

      // Article Worker:
      articleWorker(
        app.get("articleChannel"),
        rabbitMQConfig.ARTICLE_MQ_NAME,
        1
      );

      // Email Worker:
      emailWorker(app.get("emailChannel"), rabbitMQConfig.EMAIL_MQ_NAME, 1);

      break;
    } catch (err: any) {
      console.log(err.message);
      await sleep(rabbitMQConfig.SERVER_OPTIONS.reInitConnDelay);
      console.log("Retrying to connect to RabbitMQ...");
    }
  }
})();

app.get("/", (req, res) => {
  res.send("Newsletter Email server");
});

// Routes:

// Global Error Handler:
app.use(globalErrorHandler);

// Uncaught Exception:
process.on("uncaughtException", (err: any) => {
  console.log("Uncaught Exception, shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
console.log(process.env.PORT);
const server = app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running on port 5001");
});

// Unhandled Rejection:
process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection, shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

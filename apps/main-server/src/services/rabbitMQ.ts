import amqplib from "amqplib";
import AppError from "../utils/AppError";
import rabbitMQConfig from "../configs/rabbitMQConfig.json";
import { sleep } from "../utils/general.util";

class RabbitMQServices {
  // Get a RabbitMQ connection:
  static getMQConnection = async (): Promise<amqplib.Connection> => {
    let retry: number = 0;
    while (retry < rabbitMQConfig.SERVER_OPTIONS.connRetries) {
      try {
        const conn = await amqplib.connect(process.env.RABBITMQ_URL!);

        console.log("Connected to RabbitMQ");

        return conn;
      } catch (err: any) {
        console.log("Could not connect to RabbitMQ, retrying...");
        retry++;

        await sleep(rabbitMQConfig.SERVER_OPTIONS.connRetriesDelay);
      }
    }
    throw new AppError(500, "Unable to establish MQ connection");
  };

  //   Create a new Channel:
  static createMQChannel = async (
    conn: amqplib.Connection
  ): Promise<amqplib.Channel> => {
    try {
      const channel = await conn.createChannel();

      return channel;
    } catch (err) {
      throw new AppError(500, "Unable to create a channel");
    }
  };

  //   Send Messages:
  static sendMQMessage = async (
    channel: amqplib.Channel,
    queueName: string,
    message: any
  ) => {
    try {
      // Create the queue if not exists:
      channel.assertQueue(queueName, {
        durable: true,
      });

      const msgBuffer = Buffer.from(JSON.stringify(message));

      channel.sendToQueue(queueName, msgBuffer, {
        persistent: true,
      });
    } catch (err) {
      console.log(err);
      throw new AppError(500, "Could not publish the message");
    }
  };
}

export default RabbitMQServices;

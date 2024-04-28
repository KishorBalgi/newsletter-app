import amqplib from "amqplib";
import NewsLetterServices from "../services/newsletter";
import RabbitMQServices from "../services/rabbitMQ";
import rabbitMQConfig from "../configs/rabbitMQConfig.json";
import emailConfig from "../configs/emailConfig.json";

const articleWorker = async (
  channel: amqplib.Channel,
  queueName: string,
  numberOfWorkers = 1
) => {
  for (let worker = 1; worker <= numberOfWorkers; worker++) {
    channel.assertQueue(queueName, { durable: true });

    channel.consume(
      queueName,
      async (message) => {
        if (!message) return;
        const article = JSON.parse(message.content.toString());

        const subscribers = await NewsLetterServices.getNewsletterSubscribers(
          article.newsletterId
        );

        const author = await NewsLetterServices.getNewsLetterAuthor(
          article.newsletterId
        );

        subscribers.forEach(async (subscriber) => {
          await RabbitMQServices.sendMQMessage(
            channel,
            rabbitMQConfig.EMAIL_MQ_NAME,
            {
              type: emailConfig.types.ARTICLE.name,
              data: {
                ...article,
                email: subscriber.email,
                author: author.name,
              },
            }
          );
        });

        console.log(`New Article Published: Id -> ${article.articleId}`);

        channel.ack(message);
      },
      {
        noAck: false,
      }
    );
  }
};

export default articleWorker;

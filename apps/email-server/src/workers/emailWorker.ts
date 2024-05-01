import amqplib from "amqplib";
import EmailServices from "../services/email";
import emailConfig from "../configs/emailConfig.json";

const emailWorker = async (
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
        const email = JSON.parse(message.content.toString());

        console.log("Email Worker: ", email);
        console.log(`Worker ${worker}: ${email.type} ${email.data.email}`);

        // Get subject and body from emailConfig:
        let { subject, body } =
          emailConfig.types[email.type as keyof typeof emailConfig.types];

        switch (email.type) {
          case emailConfig.types.ARTICLE.name:
            subject = subject.replace("{{author}}", email.data.author);
            body = body.replace("{{author}}", email.data.author);
            body = body.replace(
              "{{url}}",
              `${process.env.FRONTEND_URL}/newsletter/${email.data.newsletterId}/article/${email.data.articleId}`
            );
            break;
          case emailConfig.types.WELCOME.name:
            subject = subject.replace("{{name}}", email.data.name);
            body = body.replace("{{name}}", email.data.name);
            break;
          default:
            break;
        }

        await EmailServices.sendMail(email.data.email, subject, body);

        channel.ack(message);
      },
      {
        noAck: false,
      }
    );
  }
};

export default emailWorker;

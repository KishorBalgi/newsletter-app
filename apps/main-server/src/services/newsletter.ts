import AppError from "../utils/AppError";
import Prisma from "./postgres_connect";
import { Newsletter } from "@repo/types/newsletter";
import { Subscriber } from "@repo/types/subscriber";
import { Article } from "@repo/types/article";

class NewsLetterServices {
  // Create a newsletter
  static createNewsletter = async (data: {
    name: string;
    authorId: number;
  }): Promise<Newsletter> => {
    // Check if the author exists:
    const author = await Prisma.author.findUnique({
      where: { id: data.authorId },
    });

    if (!author) {
      throw new AppError(404, "Author does not exist");
    }

    const newsletter = await Prisma.newsLetter.create({
      data,
    });

    return newsletter;
  };

  // Get all newsletters
  static getNewsletters = async (): Promise<Newsletter[]> => {
    const newsletters = await Prisma.newsLetter.findMany();

    return newsletters;
  };

  // Get a newsletter by ID
  static getNewsletter = async (id: number): Promise<Newsletter> => {
    const newsletter = await Prisma.newsLetter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      throw new AppError(404, "Newsletter does not exist");
    }

    return newsletter;
  };

  //   Subscribe to a newsletter
  static subscribeNewsletter = async (data: {
    email: string;
    newsletterId: number;
  }): Promise<Subscriber> => {
    const newsletter = await Prisma.newsLetter.findUnique({
      where: { id: data.newsletterId },
    });

    if (!newsletter) {
      throw new AppError(404, "Newsletter does not exist");
    }

    // Check if the subscriber already exists:
    const subscriberExists = await Prisma.subscriber.findFirst({
      where: {
        email: data.email,
        newsLetterId: data.newsletterId,
      },
    });

    if (subscriberExists) {
      throw new AppError(400, "You have already subscribed to this newsletter");
    }

    const subscriber = await Prisma.subscriber.create({
      data: {
        email: data.email,
        newsLetterId: data.newsletterId,
      },
    });

    return subscriber;
  };

  // Unsubscribe from a newsletter
  static unsubscribeNewsletter = async (data: {
    email: string;
    newsletterId: number;
  }): Promise<Subscriber> => {
    const newsletter = await Prisma.newsLetter.findUnique({
      where: { id: data.newsletterId },
    });

    if (!newsletter) {
      throw new AppError(404, "Newsletter does not exist");
    }

    // Check if the subscriber already exists:
    const subscriber = await Prisma.subscriber.findFirst({
      where: {
        email: data.email,
        newsLetterId: data.newsletterId,
      },
    });

    if (!subscriber) {
      throw new AppError(400, "You have not subscribed to this newsletter");
    }

    await Prisma.subscriber.delete({
      where: {
        newsLetterId_email: {
          email: data.email,
          newsLetterId: data.newsletterId,
        },
      },
    });

    return subscriber;
  };

  //   Create a article under the newsletter:
  static createArticle = async (data: {
    title: string;
    body: string;
    authorId: number;
    newsLetterId: number;
  }): Promise<Article> => {
    const newsletter = await Prisma.newsLetter.findUnique({
      where: { id: data.newsLetterId },
    });

    if (!newsletter) {
      throw new AppError(404, "Newsletter does not exist");
    }

    const article = await Prisma.article.create({
      data,
    });

    if (!article) {
      throw new AppError(400, "Failed to create article");
    }

    return article;
  };

  // Get all articles under a newsletter:
  static getArticles = async (newsLetterId: number): Promise<Article[]> => {
    const articles = await Prisma.article.findMany({
      where: { newsLetterId },
    });

    return articles;
  };

  // Get an article by ID:
  static getArticle = async (id: number): Promise<Article> => {
    const article = await Prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new AppError(404, "Article does not exist");
    }

    return article;
  };
}

export default NewsLetterServices;

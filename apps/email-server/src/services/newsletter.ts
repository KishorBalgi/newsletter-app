import AppError from "../utils/AppError";
import Prisma from "./postgres_connect";
import { Subscriber } from "@repo/types/subscriber";
import { Author } from "@repo/types/author";

class NewsLetterServices {
  // Get NewsLetter author:
  static getNewsLetterAuthor = async (
    newsLetterId: number
  ): Promise<Author> => {
    const newsLetter = await Prisma.newsLetter.findUnique({
      where: {
        id: newsLetterId,
      },
    });

    if (!newsLetter) {
      throw new AppError(404, "NewsLetter not found");
    }

    const author = await Prisma.author.findUnique({
      where: {
        id: newsLetter.authorId,
      },
    });

    if (!author) {
      throw new AppError(404, "Author not found");
    }

    return author;
  };

  //   Get Newsletter subscribers:
  static getNewsletterSubscribers = async (
    newsLetterId: number
  ): Promise<Subscriber[]> => {
    const subscribers = await Prisma.subscriber.findMany({
      where: {
        newsLetterId,
      },
    });

    return subscribers;
  };
}

export default NewsLetterServices;

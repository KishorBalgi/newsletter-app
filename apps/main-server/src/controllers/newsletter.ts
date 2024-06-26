import { Request, Response, NextFunction } from "express";
import { RequestWithAuthor } from "@repo/types/express";
import AppError from "../utils/AppError";
import RabbitMQServices from "../services/rabbitMQ";
import { catchAsync } from "../utils/api.util";
import NewsLetterServices from "../services/newsletter";
import { sendResponse } from "../utils/api.util";
import rabbitMQConfig from "../configs/rabbitMQConfig.json";
import validator from "validator";

// Create a newsletter:
export const createNewsletter = catchAsync(
  async (req: RequestWithAuthor, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
      return next(new AppError(400, "Name is required"));
    }

    const newsletter = await NewsLetterServices.createNewsletter({
      name,
      authorId: req.author.id,
    });

    if (!newsletter) {
      return next(new AppError(500, "Failed to create newsletter"));
    }

    // Clear the cache:
    const redisClient = req.app.get("redisClient");
    const cacheKey = "newsletters";

    redisClient.del(cacheKey);

    sendResponse(res, 201, newsletter);
  }
);

// Get all newsletters:
export const getNewsletters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = req.app.get("redisClient");
    const cacheKey = "newsletters";

    // Check if the newsletters exist in the cache:
    const cachedNewsletters = await redisClient.get(cacheKey);

    if (cachedNewsletters) {
      return sendResponse(res, 200, JSON.parse(cachedNewsletters));
    }

    const newsletters = await NewsLetterServices.getNewsletters();

    redisClient.set(cacheKey, JSON.stringify(newsletters));
    redisClient.expire(cacheKey, 60 * 60 * 2);

    sendResponse(res, 200, newsletters);
  }
);

// Get a newsletter by ID:
export const getNewsletter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newsletterId } = req.params;

    const redisClient = req.app.get("redisClient");
    const cacheKey = `newsletter:${newsletterId}`;

    // Check if the newsletter exists in the cache:
    const cachedNewsletter = await redisClient.get(cacheKey);

    if (cachedNewsletter) {
      return sendResponse(res, 200, JSON.parse(cachedNewsletter));
    }

    const newsletter = await NewsLetterServices.getNewsletter(
      parseInt(newsletterId)
    );

    redisClient.set(cacheKey, JSON.stringify(newsletter));
    redisClient.expire(cacheKey, 60 * 60 * 2);

    sendResponse(res, 200, newsletter);
  }
);

// Subscribe to a newsletter:
export const subscribeNewsletter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { newsletterId } = req.params;

    if (!email) {
      return next(new AppError(400, "Email is required"));
    }

    // Validate email:
    if (!validator.isEmail(req.body.email)) {
      return next(new AppError(400, "Invalid email address"));
    }

    // Subscribe to the newsletter:
    const subscriber = await NewsLetterServices.subscribeNewsletter({
      email,
      newsletterId: parseInt(newsletterId),
    });

    if (!subscriber) {
      return next(new AppError(500, "Failed to subscribe"));
    }

    sendResponse(res, 201, {});
  }
);

// Unsubscribe from a newsletter:
export const unsubscribeNewsletter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { newsletterId } = req.params;

    if (!email) {
      return next(new AppError(400, "Email is required"));
    }

    // Validate email:
    if (!validator.isEmail(req.body.email)) {
      return next(new AppError(400, "Invalid email address"));
    }

    // Unsubscribe from the newsletter:
    const subscriber = await NewsLetterServices.unsubscribeNewsletter({
      email,
      newsletterId: parseInt(newsletterId),
    });

    if (!subscriber) {
      return next(new AppError(500, "Failed to unsubscribe"));
    }

    sendResponse(res, 200, {});
  }
);

// Add an article to a newsletter:
export const createArticle = catchAsync(
  async (req: RequestWithAuthor, res: Response, next: NextFunction) => {
    const { title, body } = req.body;
    const { newsletterId } = req.params;

    if (!title || !body) {
      return next(new AppError(400, "Title and content are required"));
    }

    // Check if the newsletter exists:

    // Add the article to the newsletter:
    const article = await NewsLetterServices.createArticle({
      title,
      body,
      authorId: req.author.id,
      newsLetterId: parseInt(newsletterId),
    });

    if (!article) {
      return next(new AppError(500, "Failed to create article"));
    }

    // Publish the article to the MQ:
    await RabbitMQServices.sendMQMessage(
      req.app.get("articleChannel"),
      rabbitMQConfig.ARTICLE_MQ_NAME,
      {
        articleId: article.id,
        newsletterId: article.newsLetterId,
      }
    );

    // Clear the cache:
    const redisClient = req.app.get("redisClient");
    const cacheKey = `articles:${newsletterId}`;

    redisClient.del(cacheKey);

    sendResponse(res, 201, article);
  }
);

// Get all articles under a newsletter:
export const getArticles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newsletterId } = req.params;

    const redisClient = req.app.get("redisClient");
    const cacheKey = `articles:${newsletterId}`;

    // Check if the articles exist in the cache:
    const cachedArticles = await redisClient.get(cacheKey);

    if (cachedArticles) {
      return sendResponse(res, 200, JSON.parse(cachedArticles));
    }

    const articles = await NewsLetterServices.getArticles(
      parseInt(newsletterId)
    );

    redisClient.set(cacheKey, JSON.stringify(articles));
    redisClient.expire(cacheKey, 60 * 60 * 2);

    sendResponse(res, 200, articles);
  }
);

// Get an article by ID:
export const getArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { articleId } = req.params;

    const redisClient = req.app.get("redisClient");
    const cacheKey = `article:${articleId}`;

    // Check if the article exists in the cache:
    const cachedArticle = await redisClient.get(cacheKey);

    if (cachedArticle) {
      return sendResponse(res, 200, JSON.parse(cachedArticle));
    }

    const article = await NewsLetterServices.getArticle(parseInt(articleId));

    redisClient.set(cacheKey, JSON.stringify(article));
    redisClient.expire(cacheKey, 60 * 60 * 2);

    sendResponse(res, 200, article);
  }
);

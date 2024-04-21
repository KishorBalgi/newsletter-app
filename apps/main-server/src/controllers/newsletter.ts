import { Request, Response, NextFunction } from "express";
import { RequestWithAuthor } from "@repo/types/express";
import AppError from "../utils/AppError";
import { catchAsync, setCookie } from "../utils/api.util";
import NewsLetterServices from "../services/newsletter";
import { sendResponse } from "../utils/api.util";

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

    sendResponse(res, 201, newsletter);
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

    sendResponse(res, 201, article);
  }
);

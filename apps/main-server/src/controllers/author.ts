import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { catchAsync } from "../utils/api.util";
import { createAuthor } from "../services/author";
import { sendResponse } from "../utils/api.util";

// Create Author:
export const createAuthorController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return next(new AppError(400, "Please provide name, email and password"));
    }

    const author = await createAuthor(req.body);

    sendResponse(res, 201, author);
  }
);

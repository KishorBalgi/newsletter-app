import { Request, Response, NextFunction } from "express";
import { RequestWithAuthor } from "@repo/types/express";
import AppError from "../utils/AppError";
import { catchAsync } from "../utils/api.util";
import AuthorServices from "../services/author";
import { verify } from "jsonwebtoken";

export const isLoggedIn = catchAsync(
  async (req: RequestWithAuthor, res: Response, next: NextFunction) => {
    // Get the token from the header:
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Verify the token:
    const decoded: any = verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return next(new AppError(401, "Invalid token"));
    }

    // Check if the author exists:
    const author = await AuthorServices.getAuthorById(decoded.id);

    if (!author) {
      return next(new AppError(404, "User does not exist"));
    }

    // Attach the author to the request object:
    req.author = decoded;

    next();
  }
);

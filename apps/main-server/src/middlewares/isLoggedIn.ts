import { Request, Response, NextFunction } from "express";
import { RequestWithAuthor } from "@repo/types/express";
import AppError from "../utils/AppError";
import { catchAsync } from "../utils/api.util";
import AuthorServices from "../services/author";
import { verifyToken } from "../utils/auth.util";

export const isLoggedIn = catchAsync(
  async (req: RequestWithAuthor, res: Response, next: NextFunction) => {
    // Get the token from cookies:
    let token = req.cookies.jwt;

    if (!token) {
      // Get the token from the header:
      token = req.headers.authorization?.split(" ")[1];
    }

    if (!token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Verify the token:
    const decoded: any = verifyToken(token);

    if (!decoded) {
      return next(new AppError(401, "Logged out, please login again"));
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

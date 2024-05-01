import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { catchAsync, setCookie } from "../utils/api.util";
import { sendResponse } from "../utils/api.util";
import AuthService from "../services/auth";
import RabbitMQServices from "../services/rabbitMQ";
import emailConfig from "../configs/emailConfig.json";
import rabbitMQConfig from "../configs/rabbitMQConfig.json";
import validator from "validator";
import { RequestWithAuthor } from "@repo/types/express";

// Signup Author:
export const signupController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return next(new AppError(400, "Please provide name, email and password"));
    }

    // Validate email:
    if (!validator.isEmail(req.body.email)) {
      return next(new AppError(400, "Invalid email address"));
    }

    const { author, token } = await AuthService.signup(req.body);

    // Send welcome email:
    await RabbitMQServices.sendMQMessage(
      req.app.get("articleChannel"),
      rabbitMQConfig.EMAIL_MQ_NAME,
      {
        type: emailConfig.types.WELCOME.name,
        data: {
          email: author.email,
          name: author.name,
        },
      }
    );

    // Remove password from the response:
    author.password = undefined as any;

    // Add the token to cookies:
    setCookie(res, "jwt", token);

    sendResponse(res, 201, { ...author, token });
  }
);

// Login Author:
export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return next(new AppError(400, "Please provide email and password"));
    }

    // Validate email:
    if (!validator.isEmail(req.body.email)) {
      return next(new AppError(400, "Invalid email address"));
    }

    const { author, token } = await AuthService.login(
      req.body.email,
      req.body.password
    );

    // Remove password from the response:
    author.password = undefined as any;

    // Add the token to cookies:
    setCookie(res, "jwt", token);

    sendResponse(res, 200, { ...author, token });
  }
);

// Is Logged In:
export const isLoggedInController = catchAsync(
  async (req: RequestWithAuthor, res: Response, next: NextFunction) => {
    if (!req.author) {
      return sendResponse(res, 401, {});
    }

    sendResponse(res, 200, { author: req.author });
  }
);

// Logout Author:
export const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt");

    sendResponse(res, 200, {});
  }
);

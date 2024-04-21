import { Request, Response, NextFunction, CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

// Purpose: Express middleware to catch async errors.
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
};

export const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

// Purpose: Express middleware to set cookie.
export const setCookie = (res: Response, name: string, value: string) => {
  res.cookie(name, value, cookieOptions);
};

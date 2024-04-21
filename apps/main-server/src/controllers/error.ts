import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// Dev Error:
const sendErrDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

// Prod Error:
const sendErrProd = (err: any, res: Response) => {
  if (err.isOperational) {
    // Operational error:
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Internal server error:
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
// Global Error Handler:
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Global Error Handler");
  console.log(error);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrProd(error, res);
  }
};

export default globalErrorHandler;

import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";

// Handle Prisma Error:
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  let error: any = { ...err };
  error.message = err.message;

  if (err.code === "P2002") {
    console.log(err);
    const message = `${err?.meta?.target} already in use!`;
    return new AppError(400, message);
  }

  if (err.code === "P2025") {
    const message = "Invalid data";
    return new AppError(400, message);
  }

  return new AppError(500, "Something went wrong!");
};

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

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(error);
  }

  if (process.env.NODE_ENV === "development") {
    sendErrDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrProd(error, res);
  }
};

export default globalErrorHandler;

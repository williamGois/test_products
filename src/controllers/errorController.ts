import { Request, Response } from 'express';
import AppError from '../utils/appError';

// Handles all previously unhandled errors
export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: () => void) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors: Record<string, string> = {};
    errors.array().forEach((err) => {
      extractedErrors[err.param] = err.msg;
    });
    return res.status(422).json({ errors: extractedErrors });
  }
  return next();
};

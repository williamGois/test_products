import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { promisify } from 'util';
import User  from '../models/userModel';
import catchAsync  from '../utils/catchAsync';
import AppError from '../utils/appError';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  // If everything is ok, send token to client
  const token = sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

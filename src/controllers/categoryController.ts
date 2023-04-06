import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const category = await Category.create({ name });

  res.status(201).json({
    status: "success",
    category,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    categories,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    category,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    category,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    category: null,
  });
});

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
import { Request, Response } from "express";
import ProductModel from "../models/productModel";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("category");

    return res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { category, name, qty, price, description } = req.body;

    const product = await ProductModel.create({ category, name, qty, price, description });

    return res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    
    return res.status(400).json({ err });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category, name, qty, price, description } = req.body;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.category = category;
    product.name = name;
    product.description = description;
    product.qty = qty;
    product.price = price;

    await product.save();

    return res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

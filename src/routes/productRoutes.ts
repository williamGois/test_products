import express from "express";
import productController from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// List all products
router.get("/", productController.getProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Create a new product
router.post("/", authMiddleware, productController.createProduct);

// Update a product
router.patch("/:id", authMiddleware, productController.updateProduct);

// Delete a product
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;

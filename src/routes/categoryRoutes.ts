import { Router } from "express";
import categoryController from "../controllers/categoryController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// List all categorys
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", authMiddleware, categoryController.createCategory);

// Update a category
router.patch("/:id", authMiddleware, categoryController.updateCategory);

// Delete a category
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;

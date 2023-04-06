import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// List all Users
router.get("/", userController.getUsers);

// Get User by ID
router.get("/:id", userController.getUser);

// Create a new User
router.post("/", authMiddleware, userController.createUser);

// Update a User
router.patch("/:id", authMiddleware, userController.updateUser);

// Delete a User
router.delete("/:id", authMiddleware, userController.deleteUser);


export default router;

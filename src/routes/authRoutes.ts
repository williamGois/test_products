import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

// Rota para autenticação de usuário
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
  ],
  validateRequest,
  authController.login
);

export default router;

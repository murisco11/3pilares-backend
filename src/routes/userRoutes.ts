import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(authMiddleware);

userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.getById);
userRoutes.delete("/:id", userController.delete);
userRoutes.put("/", userController.update);
userRoutes.post("/", userController.create);

export { userRoutes };

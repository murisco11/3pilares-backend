import { Router } from "express";
import { ExerciseController } from "../controllers/ExerciseController";

const exerciseRoutes = Router();
const exerciseController = new ExerciseController();

exerciseRoutes.get("/:id", exerciseController.getById);
exerciseRoutes.get("/dayTraining/:id", exerciseController.getByDayTraining);
exerciseRoutes.delete("/:id", exerciseController.delete);
exerciseRoutes.put("/", exerciseController.update);
exerciseRoutes.post("/", exerciseController.create);

export { exerciseRoutes };
import { Router } from "express";
import { DBExerciseController } from "../controllers/DBExerciseController";

const dBExerciseRoutes = Router();
const dBExerciseController = new DBExerciseController();

dBExerciseRoutes.get("/:id", dBExerciseController.getById);
dBExerciseRoutes.get("/", dBExerciseController.getAll);
dBExerciseRoutes.delete("/:id", dBExerciseController.delete);
dBExerciseRoutes.put("/", dBExerciseController.update);
dBExerciseRoutes.post("/", dBExerciseController.create);
dBExerciseRoutes.post("/", dBExerciseController.createMany);

export { dBExerciseRoutes };

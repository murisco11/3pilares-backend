import { Router } from "express";
import { RegisterExerciseController } from "../controllers/RegisterExerciseController";

const registerExerciseRoutes = Router();
const registerExerciseController = new RegisterExerciseController();

registerExerciseRoutes.get("/:id", registerExerciseController.getById);
registerExerciseRoutes.get("/daytraining/:id", registerExerciseController.getAllByUserId);
registerExerciseRoutes.delete("/:id", registerExerciseController.delete);
registerExerciseRoutes.put("/", registerExerciseController.update);
// registerExerciseRoutes.post("/", registerExerciseController.create);

export { registerExerciseRoutes };

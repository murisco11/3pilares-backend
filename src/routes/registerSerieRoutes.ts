import { Router } from "express";
import { RegisterSerieController } from "../controllers/RegisterSerieController";

const registerSerieRoutes = Router();
const registerSerieController = new RegisterSerieController();

registerSerieRoutes.get("/:id", registerSerieController.getById);
registerSerieRoutes.get(
  "/registerexercise/:id",
  registerSerieController.getByRegisterExercise
);
registerSerieRoutes.get(
  "/exercise/:id",
  registerSerieController.getByExercise
);
registerSerieRoutes.put("/", registerSerieController.update);
// registerSerieRoutes.post("/", registerSerieController.create);
// registerSerieRoutes.delete("/:id", registerSerieController.delete);

export { registerSerieRoutes };

import { Router } from "express";
import { TrainingController } from "../controllers/TrainingController";

const trainingRoutes = Router();
const trainingController = new TrainingController();

trainingRoutes.get("/:id", trainingController.getById);
trainingRoutes.get("/user/:id", trainingController.getAllByUserId);
trainingRoutes.delete("/:id", trainingController.delete);
trainingRoutes.put("/", trainingController.update);
trainingRoutes.post("/", trainingController.create);

export { trainingRoutes };

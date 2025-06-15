import { Router } from "express";
import { DayTrainingController } from "../controllers/DayTrainingController";

const dayTrainingRoutes = Router();
const dayTrainingController = new DayTrainingController();

dayTrainingRoutes.get("/:id", dayTrainingController.getById);
dayTrainingRoutes.get("/training/:id", dayTrainingController.getAllByTrainingId);
dayTrainingRoutes.delete("/:id", dayTrainingController.delete);
dayTrainingRoutes.put("/", dayTrainingController.update);
dayTrainingRoutes.post("/", dayTrainingController.create);

export { dayTrainingRoutes };

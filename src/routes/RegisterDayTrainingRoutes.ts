import { Router } from "express";
import { RegisterDayTrainingController } from "../controllers/RegisterDayTrainingController";

const registerDayTrainingRoutes = Router();
const registerDayTrainingController = new RegisterDayTrainingController();

registerDayTrainingRoutes.get("/:id", registerDayTrainingController.getById);
registerDayTrainingRoutes.delete("/:id", registerDayTrainingController.delete);
registerDayTrainingRoutes.put("/", registerDayTrainingController.update);
registerDayTrainingRoutes.post("/", registerDayTrainingController.create);

export { registerDayTrainingRoutes };

import { Request, Response } from "express";
import { DayTrainingService } from "../services/DayTrainingService";
import { DayTraining } from "../entities/DayTraining";

export class DayTrainingController {
  private readonly dayTrainingService: DayTrainingService;

  constructor() {
    this.dayTrainingService = new DayTrainingService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDayTraining: number = Number(req.params.id);

      const dayTraining = await this.dayTrainingService.getById(idDayTraining);

      if (dayTraining) {
        return res.status(200).json(dayTraining);
      } else {
        return res.status(300).json({ message: "DayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getAllByTrainingId = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const trainingId: number = Number(req.params.id);
      const dayTrainings = await this.dayTrainingService.getAllByTrainingId(
        trainingId
      );

      if (dayTrainings) {
        return res.status(200).json(dayTrainings);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dayTrainingData: DayTraining = req.body;

      const newDayTraining = await this.dayTrainingService.create(
        dayTrainingData
      );

      return res.status(201).json(newDayTraining);
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dayTrainingData: DayTraining = req.body;

      const updateDayTraining = await this.dayTrainingService.update(
        dayTrainingData.id,
        dayTrainingData
      );

      if (updateDayTraining) {
        return res.status(200).json(updateDayTraining);
      } else {
        return res.status(404).json({ message: "DayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDayTraining: number = Number(req.params.id);

      const deleteDayTraining = await this.dayTrainingService.delete(
        idDayTraining
      );

      if (deleteDayTraining) {
        return res
          .status(200)
          .json({ message: "DayTraining was deleted", id: idDayTraining });
      } else {
        return res.status(404).json({ message: "DayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };
}

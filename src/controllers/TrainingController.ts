import { Training } from "../entities/Training";
import { Request, Response } from "express";
import { TrainingService } from "./../services/TrainingService";

export class TrainingController {
  private readonly trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idTraining: number = Number(req.params.id);
      const training = await this.trainingService.getById(idTraining);

      if (training) {
        return res.status(200).json(training);
      } else {
        return res.status(404).json({ message: "Training not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const trainingData: Training = req.body;

      const newTraining = await this.trainingService.create(trainingData);

      return res.status(201).json(newTraining);
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const trainingData: Training = req.body;

      const updateTraining = await this.trainingService.update(trainingData.id, trainingData);

      if (updateTraining) {
        return res.status(200).json(updateTraining);
      } else {
        return res.status(404).json({ message: "Training not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idTraining: number = Number(req.params.id);
      const deleteTraining = await this.trainingService.delete(idTraining);

      if (deleteTraining) {
        return res
          .status(200)
          .json({ message: "Training was deleted", id: idTraining });
      } else {
        return res.status(404).json({ message: "Training not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };
}

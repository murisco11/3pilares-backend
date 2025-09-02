import { RegisterExercise } from "../entities/RegisterExercise";
import { Request, Response } from "express";
import { RegisterExerciseService } from "./../services/RegisterExerciseService";

export class RegisterExerciseController {
  private readonly trainingService: RegisterExerciseService;

  constructor() {
    this.trainingService = new RegisterExerciseService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterExercise: number = Number(req.params.id);
      const training = await this.trainingService.getById(idRegisterExercise);

      if (training) {
        return res.status(200).json(training);
      } else {
        return res.status(404).json({ message: "RegisterExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getAllByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId: number = Number(req.params.id)
      const trainings = await this.trainingService.getByRegisterDayTraining(userId)
  
      if (trainings) {
        return res.status(200).json(trainings)
      } else {
        return res.status(200).json([])
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  }

//   create = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const trainingData: RegisterExercise = req.body;

//       const newRegisterExercise = await this.trainingService.create(trainingData);

//       return res.status(201).json(newRegisterExercise);
//     } catch (error) {
//       return res.status(500).json({ message: "Error on server" });
//     }
  // };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const trainingData: RegisterExercise = req.body;

      const updateRegisterExercise = await this.trainingService.update(trainingData.id, trainingData);

      if (updateRegisterExercise) {
        return res.status(200).json(updateRegisterExercise);
      } else {
        return res.status(404).json({ message: "RegisterExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterExercise: number = Number(req.params.id);
      const deleteRegisterExercise = await this.trainingService.delete(idRegisterExercise);

      if (deleteRegisterExercise) {
        return res
          .status(200)
          .json({ message: "RegisterExercise was deleted", id: idRegisterExercise });
      } else {
        return res.status(404).json({ message: "RegisterExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };
}

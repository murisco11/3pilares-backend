import { RegisterExercise } from "../entities/RegisterExercise";
import { Request, Response } from "express";
import { RegisterExerciseService } from "./../services/RegisterExerciseService";

export class RegisterExerciseController {
  private readonly registerExerciseService: RegisterExerciseService;

  constructor() {
    this.registerExerciseService = new RegisterExerciseService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterExercise: number = Number(req.params.id);
      const registerExercise = await this.registerExerciseService.getById(idRegisterExercise);

      if (registerExercise) {
        return res.status(200).json(registerExercise);
      } else {
        return res.status(404).json({ message: "RegisterExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getAllByByRegisterDayTraining = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId: number = Number(req.params.id);
      const registerExercises = await this.registerExerciseService.getByRegisterDayTraining(
        userId
      );

      if (registerExercises) {
        return res.status(200).json(registerExercises);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  analyzeExercises = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDayTraining: number = Number(req.params.id);
      const analyzeExercises = await this.registerExerciseService.analyzeExercises(idDayTraining);

      if (analyzeExercises) {
        return res.status(200).json(analyzeExercises);
      } else {
        return res.status(404).json({ message: "Best exercise not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on server" });
    }
  };

  //   create = async (req: Request, res: Response): Promise<Response> => {
  //     try {
  //       const registerExerciseData: RegisterExercise = req.body;

  //       const newRegisterExercise = await this.registerExerciseService.create(registerExerciseData);

  //       return res.status(201).json(newRegisterExercise);
  //     } catch (error) {
  //       return res.status(500).json({ message: "Error on server" });
  //     }
  // };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registerExerciseData: RegisterExercise = req.body;

      const updateRegisterExercise = await this.registerExerciseService.update(
        registerExerciseData.id,
        registerExerciseData
      );

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
      const deleteRegisterExercise = await this.registerExerciseService.delete(
        idRegisterExercise
      );

      if (deleteRegisterExercise) {
        return res
          .status(200)
          .json({
            message: "RegisterExercise was deleted",
            id: idRegisterExercise,
          });
      } else {
        return res.status(404).json({ message: "RegisterExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };
}

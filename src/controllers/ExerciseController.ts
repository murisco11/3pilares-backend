import { Exercise } from "../entities/Exercise";
import { Request, Response } from "express";
import { ExerciseService } from "./../services/ExerciseService";

export class ExerciseController {
  private readonly exerciseService: ExerciseService;

  constructor() {
    this.exerciseService = new ExerciseService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idExercise: number = Number(req.params.id);
      const exercise = await this.exerciseService.getById(idExercise);

      if (exercise) {
        return res.status(200).json(exercise);
      } else {
        return res.status(404).json({ message: "Exercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

    getByDayTraining = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDayTraining: number = Number(req.params.id);
      const exercises = await this.exerciseService.getByDayTraining(idDayTraining);

      if (exercises) {
        return res.status(200).json(exercises);
      } else {
        return res.status(404).json({ message: "Exercises not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const exerciseData: Exercise = req.body;
      console.log(exerciseData)

      const newExercise = await this.exerciseService.create(exerciseData);

      return res.status(201).json(newExercise);
    } catch (error) {
      return res.status(500).json({ message: "Error on server: ", error });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const exerciseData: Exercise = req.body;

      const updateExercise = await this.exerciseService.update(exerciseData.id, exerciseData);

      if (updateExercise) {
        return res.status(200).json(updateExercise);
      } else {
        return res.status(404).json({ message: "Exercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idExercise: number = Number(req.params.id);
      const deleteExercise = await this.exerciseService.delete(idExercise);

      if (deleteExercise) {
        return res
          .status(200)
          .json({ message: "Exercise was deleted", id: idExercise });
      } else {
        return res.status(404).json({ message: "Exercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };
}

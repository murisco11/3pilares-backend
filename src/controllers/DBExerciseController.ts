import { Request, Response } from "express";
import { DBExercise } from "../entities/DBExercise";
import { DBExerciseService } from "../services/DBExercise";

export class DBExerciseController {
  private readonly dBExerciseController: DBExerciseService;

  constructor() {
    this.dBExerciseController = new DBExerciseService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDBExercise: number = Number(req.params.id);

      const dBExercise = await this.dBExerciseController.getById(idDBExercise);

      if (dBExercise) {
        return res.status(200).json(dBExercise);
      } else {
        return res.status(300).json({ message: "DBExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dBExercises = await this.dBExerciseController.getAll();

      if (dBExercises) {
        return res.status(200).json(dBExercises);
      } else {
        return res.status(300).json({ message: "No DBExercises found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dBExerciseData: DBExercise = req.body;

      const newDBExercise = await this.dBExerciseController.create(
        dBExerciseData
      );

      return res.status(201).json(newDBExercise);
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  createMany = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dBExercisesData: DBExercise[] = req.body;
      const newDBExercises = await this.dBExerciseController.createMany(
        dBExercisesData
      );
      return res.status(201).json(newDBExercises);
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dBExerciseData: DBExercise = req.body;

      const updateDBExercise = await this.dBExerciseController.update(
        dBExerciseData.id,
        dBExerciseData
      );

      if (updateDBExercise) {
        return res.status(200).json(updateDBExercise);
      } else {
        return res.status(404).json({ message: "DBExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDBExercise: number = Number(req.params.id);

      const deleteDBExercise = await this.dBExerciseController.delete(
        idDBExercise
      );

      if (deleteDBExercise) {
        return res
          .status(200)
          .json({ message: "DBExercise was deleted", id: idDBExercise });
      } else {
        return res.status(404).json({ message: "DBExercise not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };
}

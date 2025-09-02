import { RegisterDayTraining } from "../entities/RegisterDayTraining";
import { Request, Response } from "express";
import { RegisterDayTrainingService } from "./../services/RegisterDayTrainingService";

export class RegisterDayTrainingController {
  private readonly registerDayTrainingService: RegisterDayTrainingService;

  constructor() {
    this.registerDayTrainingService = new RegisterDayTrainingService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterDayTraining: number = Number(req.params.id);
      const registerDayTraining = await this.registerDayTrainingService.getById(idRegisterDayTraining);

      if (registerDayTraining) {
        return res.status(200).json(registerDayTraining);
      } else {
        return res.status(404).json({ message: "RegisterDayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

    getByDayTraining = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idDayTraining: number = Number(req.params.id);
      const registerDayTraining = await this.registerDayTrainingService.getByDayTraining(idDayTraining);

      if (registerDayTraining) {
        return res.status(200).json(registerDayTraining);
      } else {
        return res.status(404).json({ message: "RegisterDayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registerDayTrainingData: RegisterDayTraining = req.body;
      console.log(req.body)
      const newRegisterDayTraining = await this.registerDayTrainingService.create(registerDayTrainingData);

      return res.status(201).json(newRegisterDayTraining);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error on server" });
    }
  };

  // update = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const registerDayTrainingData: RegisterDayTraining = req.body;

  //     const updateRegisterDayTraining = await this.registerDayTrainingService.update(registerDayTrainingData.id, registerDayTrainingData);

  //     if (updateRegisterDayTraining) {
  //       return res.status(200).json(updateRegisterDayTraining);
  //     } else {
  //       return res.status(404).json({ message: "RegisterDayTraining not found" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ message: "Error: ", error });
  //   }
  // };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterDayTraining: number = Number(req.params.id);
      console.log(idRegisterDayTraining)
      const deleteRegisterDayTraining = await this.registerDayTrainingService.delete(idRegisterDayTraining);

      if (deleteRegisterDayTraining) {
        return res
          .status(200)
          .json({ message: "RegisterDayTraining was deleted", id: idRegisterDayTraining });
      } else {
        return res.status(404).json({ message: "RegisterDayTraining not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
    }
  };
}

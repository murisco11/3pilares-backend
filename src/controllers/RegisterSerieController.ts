import { RegisterSerie } from "../entities/RegisterSeries";
import { Request, Response } from "express";
import { RegisterSerieService } from "../services/RegisterSerieService";

export class RegisterSerieController {
  private readonly registerSerieService: RegisterSerieService;

  constructor() {
    this.registerSerieService = new RegisterSerieService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idRegisterSerie: number = Number(req.params.id);
      console.log(idRegisterSerie);
      const registerSerie = await this.registerSerieService.getById(
        idRegisterSerie
      );

      if (registerSerie) {
        return res.status(200).json(registerSerie);
      } else {
        return res.status(404).json({ message: "RegisterSerie not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getByRegisterExercise = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const idRegisterExercise: number = Number(req.params.id);
      const registerSerie =
        await this.registerSerieService.getByRegisterExercise(
          idRegisterExercise
        );

      if (registerSerie) {
        return res.status(200).json(registerSerie);
      } else {
        return res.status(404).json({ message: "RegisterSerie not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on server" });
    }
  };

  getByExercise = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idExercise: number = Number(req.params.id);
      const registerSerie = await this.registerSerieService.getByExercises(
        idExercise
      );

      if (registerSerie) {
        return res.status(200).json(registerSerie);
      } else {
        return res.status(404).json({ message: "RegisterSeries not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on server" });
    }
  };

  //   create = async (req: Request, res: Response): Promise<Response> => {
  //     try {
  //       const registerSerieData: RegisterSerie = req.body;

  //       const newRegisterSerie = await this.registerSerieService.create(registerSerieData);

  //       return res.status(201).json(newRegisterSerie);
  //     } catch (error) {
  //       return res.status(500).json({ message: "Error on server" });
  //     }
  //   };

  update = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    try {
      const registerSerieData: RegisterSerie = req.body;

      const updateRegisterSerie = await this.registerSerieService.update(
        registerSerieData.id,
        registerSerieData
      );

      if (updateRegisterSerie) {
        return res.status(200).json(updateRegisterSerie);
      } else {
        return res.status(404).json({ message: "RegisterSerie not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  //   delete = async (req: Request, res: Response): Promise<Response> => {
  //     try {
  //       const idRegisterSerie: number = Number(req.params.id);
  //       const deleteRegisterSerie = await this.registerSerieService.delete(idRegisterSerie);

  //       if (deleteRegisterSerie) {
  //         return res
  //           .status(200)
  //           .json({ message: "RegisterSerie was deleted", id: idRegisterSerie });
  //       } else {
  //         return res.status(404).json({ message: "RegisterSerie not found" });
  //       }
  //     } catch (error) {
  //       return res.status(500).json({ message: "Error on server" });
  //     }
  //   };
}

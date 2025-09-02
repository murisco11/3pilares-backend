import { Repository } from "typeorm";
import { RegisterSerie } from "../entities/RegisterSeries";
import { DataBase } from "../database/data-source";
import { Exercise } from "../entities/Exercise";

export class RegisterSerieService {
  private readonly registerSerieRepository: Repository<RegisterSerie>;

  constructor() {
    this.registerSerieRepository = DataBase.getRepository(RegisterSerie);
  }

  getById = async (idRegisterSerie: number): Promise<RegisterSerie | null> => {
    const registerSerie = await this.registerSerieRepository.findOne({
      where: { id: idRegisterSerie },
      relations: ["registerExercises", "users"],
    });

    return registerSerie;
  };

  getByRegisterExercise = async (
    idRegisterExercise: number
  ): Promise<RegisterSerie[] | []> => {
    const registerSeries = await this.registerSerieRepository.find({
      where: { registerExercises: { id: idRegisterExercise } },
      relations: ["registerExercises"],
    });

    return registerSeries;
  };
  
  getByExercises = async (
    idExercise: number
  ): Promise<RegisterSerie[] | []> => {
    const registerSeries = await this.registerSerieRepository.find({
      where: { registerExercises: { exercises: { id: idExercise } } },
      relations: ["registerExercises"],
    });

    return registerSeries;
  };
  
  async update(
    idRegisterSerie: number,
    registerSerieData: Partial<RegisterSerie>
  ): Promise<RegisterSerie | null> {
    const registerSerieToUptade = await this.registerSerieRepository.findOneBy({
      id: idRegisterSerie,
    });

    if (registerSerieToUptade) {
      Object.assign(registerSerieToUptade, registerSerieData);

      this.registerSerieRepository.save(registerSerieToUptade);
      this.registerSerieRepository

      return registerSerieToUptade;
    } else {
      return null;
    }
  }

  // Parte com o Danfo
}

import { Repository } from "typeorm";
import { RegisterExercise } from "../entities/RegisterExercise";
import { DataBase } from "../database/data-source";
import { Exercise } from "../entities/Exercise";
import { RegisterSerie } from "../entities/RegisterSeries";
import { flattenNestedArray, analyzeDataGroups } from "../script";

interface registerSerieForDF {
  weight: number;
  id: number;
  reps: number;
  order: number;
  idExercise: number;
  idRegisterExercise: number;
  idRegisterDayTraining: number;
}

export class RegisterExerciseService {
  private readonly registerExerciseRepository: Repository<RegisterExercise>;

  constructor() {
    this.registerExerciseRepository = DataBase.getRepository(RegisterExercise);
  }

  getById = async (
    idRegisterExercise: number
  ): Promise<RegisterExercise | null> => {
    const registerExercise = await this.registerExerciseRepository.findOne({
      where: { id: idRegisterExercise },
      relations: ["registerSeries", "registerDayTraining", "users"],
    });

    return registerExercise;
  };

  getByRegisterDayTraining = async (
    idRegisterDayTraining: number
  ): Promise<RegisterExercise[] | null> => {
    const registerExercises = await this.registerExerciseRepository.find({
      where: { registerDayTraining: { id: idRegisterDayTraining } },
      relations: ["registerSeries", "registerDayTraining", "users"],
    });

    if (registerExercises) {
      return registerExercises;
    } else {
      return null;
    }
  };

  async update(
    idRegisterExercise: number,
    registerExerciseData: Partial<RegisterExercise>
  ): Promise<RegisterExercise | null> {
    const registerExerciseToUptade =
      await this.registerExerciseRepository.findOneBy({
        id: idRegisterExercise,
      });

    if (registerExerciseToUptade) {
      Object.assign(registerExerciseToUptade, registerExerciseData);

      this.registerExerciseRepository.save(registerExerciseToUptade);

      return registerExerciseToUptade;
    } else {
      return null;
    }
  }

  delete = async (idRegisterExercise: number): Promise<number | null> => {
    const registerExerciseToDelete =
      await this.registerExerciseRepository.findOneBy({
        id: idRegisterExercise,
      });

    if (registerExerciseToDelete) {
      this.registerExerciseRepository.delete({ id: idRegisterExercise });

      return idRegisterExercise;
    } else {
      return null;
    }
  };

  async analyzeExercises(dayTrainingId: number) {
    const registerExercises: RegisterExercise[] =
      await this.registerExerciseRepository.find({
        where: { registerDayTraining: { dayTrainings: { id: dayTrainingId } } },
        relations: ["registerSeries", "exercises", "registerDayTraining"],
      });

    const seriesInstances = flattenNestedArray(
      registerExercises,
      "registerSeries",
      (
        registerExercise: RegisterExercise,
        serie: RegisterSerie
      ): registerSerieForDF => ({
        weight: serie.weight,
        id: serie.id,
        reps: serie.reps,
        order: serie.order,
        idExercise: registerExercise.exercises.id,
        idRegisterExercise: registerExercise.id,
        idRegisterDayTraining: registerExercise.registerDayTraining.id,
      })
    );

    const analysisResults = analyzeDataGroups(
      seriesInstances,
      "idExercise",
      "weight",
      "idRegisterDayTraining"
    );
    const bestExercise =
      analysisResults.length > 0
        ? analysisResults.reduce((best, current) => {
            return current.percentage > best.percentage ? current : best;
          })
        : null;

    return { analysisResults, bestExercise };
  }
}

import { Repository } from "typeorm";
import { RegisterExercise } from "../entities/RegisterExercise";
import { DataBase } from "../database/data-source";
import { Exercise } from "../entities/Exercise";
import { RegisterSerie } from "../entities/RegisterSeries";


export class RegisterExerciseService {
  private readonly registerExerciseRepository: Repository<RegisterExercise>;

  constructor() {
    this.registerExerciseRepository = DataBase.getRepository(RegisterExercise);
  }
  private getSeries = (registerExercises: RegisterExercise[]): RegisterSerie[] => {
    let rSeries: RegisterSerie[] = [];

    for (let i = 0; i < registerExercises.length; i++) {
      let registerExercise = registerExercises[i];
      for (let j = 0; j < registerExercise.registerSeries.length; j++) {
        let serie = registerExercise.registerSeries[j];
        rSeries.push(serie);
      }
    }
    return rSeries;
  };

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

  //   create = async (
  //     registerExerciseData: Omit<RegisterExercise, "id">
  //   ): Promise<RegisterExercise | null> => {
  //     const registerExercise = this.registerExerciseRepository.create(registerExerciseData);
  //     await this.registerExerciseRepository.save(registerExercise);

  //     const registerExerciseCreated = this.registerExerciseRepository.findOne({
  //       where: { id: registerExercise.id },
  //       relations: ["user"],
  //     });

  //     return registerExerciseCreated;
  //   };

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

  async bestExercise(dayTrainingId: number): Promise<Exercise | null> {
    const registerExercises: RegisterExercise[] =
      await this.registerExerciseRepository.find({
        where: { registerDayTraining: { dayTrainings: { id: dayTrainingId } } },
      });


    const series: RegisterSerie[] = this.getSeries(registerExercises);
    const dfSeries = dfd. 

    return null;
  }
}

import { EntityManager, Repository } from "typeorm";
import { RegisterDayTraining } from "../entities/RegisterDayTraining";
import { DataBase } from "../database/data-source";
import { RegisterExercise } from "../entities/RegisterExercise";
import { RegisterSerie } from "../entities/RegisterSeries";
import { DayTrainingService } from "./DayTrainingService";
import { DayTraining } from "../entities/DayTraining";
import { Exercise } from "../entities/Exercise";

export class RegisterDayTrainingService {
  private readonly registerDayTrainingRepository: Repository<RegisterDayTraining>;
  private readonly dayTrainingService: DayTrainingService;
  private readonly entityManager: EntityManager;

  // private readonly registerExerciseRepository: Repository<RegisterExercise>;
  // private readonly registerSerieRepository: Repository<RegisterSerie>;

  constructor() {
    this.dayTrainingService = new DayTrainingService();

    this.registerDayTrainingRepository =
      DataBase.getRepository(RegisterDayTraining);

    this.entityManager = DataBase.manager;

    // this.registerExerciseRepository = DataBase.getRepository(RegisterExercise);
    // this.registerSerieRepository = DataBase.getRepository(RegisterSerie);
  }

  getById = async (
    idRegisterDayTraining: number
  ): Promise<RegisterDayTraining | null> => {
    const registerDayTraining =
      await this.registerDayTrainingRepository.findOne({
        where: { id: idRegisterDayTraining },
        relations: [
          "dayTrainings",
          "registerExercises",
          "registerExercises.exercises",
          "registerExercises.registerSeries",
        ],
      });

    return registerDayTraining;
  };

  getByDayTraining = async (
    idDayTraining: number
  ): Promise<RegisterDayTraining[] | null> => {
    console.log(idDayTraining);
    const registerDayTrainings = await this.registerDayTrainingRepository.find({
      where: { dayTrainings: { id: idDayTraining } },
      relations: [
        "dayTrainings",
        "registerExercises",
        "registerExercises.exercises",
        "registerExercises.registerSeries",
      ],
    });

    return registerDayTrainings;
  };

  create = async (
    registerDayTrainingData: Omit<
      RegisterDayTraining,
      "id" | "registerExercises"
    >
  ): Promise<RegisterDayTraining | null> => {
    console.log(registerDayTrainingData);
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const newRegisterDayTraining = transactionalEntityManager.create(
          RegisterDayTraining,
          registerDayTrainingData
        );
        await transactionalEntityManager.save(newRegisterDayTraining);
        const dayTraining = await this.dayTrainingService.getById(
          newRegisterDayTraining.dayTrainings.id
        );

        if (
          !dayTraining ||
          !dayTraining.exercises ||
          dayTraining.exercises.length === 0
        ) {
          return newRegisterDayTraining;
        }
        const creationPromises = dayTraining.exercises.map(async (exercise) => {
          const newRegisterExercise = transactionalEntityManager.create(
            RegisterExercise,
            {
              exercises: exercise,
              registerDayTraining: newRegisterDayTraining,
              users: {id: registerDayTrainingData.users.id}
            }
          );
          await transactionalEntityManager.save(newRegisterExercise);
          
          const seriesCount = exercise.series || 0;
          const seriesToCreate: RegisterSerie[] = [];
          
          for (let i = 0; i < seriesCount; i++) {
            const newSerie = transactionalEntityManager.create(RegisterSerie, {
              registerExercises: newRegisterExercise,
              users: {id: registerDayTrainingData.users.id},
              order: i + 1,
            });
            seriesToCreate.push(newSerie);
          }
          if (seriesToCreate.length > 0) {
            await transactionalEntityManager.save(seriesToCreate);
          }
        });

        await Promise.all(creationPromises);

        const completeResult = await transactionalEntityManager.findOne(
          RegisterDayTraining,
          {
            where: { id: newRegisterDayTraining.id },
            relations: [
              "dayTrainings",
              "users",
              "registerExercises",
              "registerExercises.exercises",
              "registerExercises.registerSeries",
            ],
          }
        );

        return completeResult;
      }
    );
  };

  // async update(
  //   idRegisterDayTraining: number,
  //   registerDayTrainingData: Partial<RegisterDayTraining>
  // ): Promise<RegisterDayTraining | null> {
  //   const registerDayTrainingToUptade =
  //     await this.registerDayTrainingRepository.findOneBy({
  //       id: idRegisterDayTraining,
  //     });

  //   if (registerDayTrainingToUptade) {
  //     Object.assign(registerDayTrainingToUptade, registerDayTrainingData);

  //     this.registerDayTrainingRepository.save(registerDayTrainingToUptade);

  //     return registerDayTrainingToUptade;
  //   } else {
  //     return null;
  //   }
  // }

  delete = async (idRegisterDayTraining: number): Promise<number | null> => {
    const registerDayTrainingToDelete =
      await this.registerDayTrainingRepository.findOneBy({
        id: idRegisterDayTraining,
      });

    if (registerDayTrainingToDelete) {
      this.registerDayTrainingRepository.delete({ id: idRegisterDayTraining });

      return idRegisterDayTraining;
    } else {
      return null;
    }
  };
}

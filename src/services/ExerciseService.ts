import { Repository } from "typeorm";
import { Exercise } from "../entities/Exercise";
import { DataBase } from "../database/data-source";

export class ExerciseService {
  private readonly exerciseRepository: Repository<Exercise>;

  constructor() {
    this.exerciseRepository = DataBase.getRepository(Exercise);
  }

  getById = async (idExercise: number): Promise<Exercise | null> => {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: idExercise },
      relations: ["dayTraining", "dbExercise"],
    });

    return exercise;
  };

  getByDayTraining = async (
    idDayTraining: number
  ): Promise<Exercise[] | null> => {
    const exercises = await this.exerciseRepository.find({
      where: { dayTraining: { id: idDayTraining } },
      relations: ["dbExercise"],
    });

    return exercises;
  };

  create = async (
    exerciseData: Omit<Exercise, "id">
  ): Promise<Exercise | null> => {
    const exercise = this.exerciseRepository.create(exerciseData);
    await this.exerciseRepository.save(exercise);

    const exerciseCreated = this.exerciseRepository.findOne({
      where: { id: exercise.id },
      relations: ["dayTraining", "dbExercise"],
    });

    return exerciseCreated;
  };

  async update(
    idExercise: number,
    exerciseData: Partial<Exercise>
  ): Promise<Exercise | null> {
    const exerciseToUptade = await this.exerciseRepository.findOneBy({
      id: idExercise,
    });

    if (exerciseToUptade) {
      Object.assign(exerciseToUptade, exerciseData);

      this.exerciseRepository.save(exerciseToUptade);

      return exerciseToUptade;
    } else {
      return null;
    }
  }

  delete = async (idExercise: number): Promise<number | null> => {
    const exerciseToDelete = await this.exerciseRepository.findOneBy({
      id: idExercise,
    });

    if (exerciseToDelete) {
      this.exerciseRepository.delete({ id: idExercise });

      return idExercise;
    } else {
      return null;
    }
  };
}

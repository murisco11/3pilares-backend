import { Repository } from "typeorm";
import { DBExercise } from "../entities/DBExercise";
import { DataBase } from "../database/data-source";

export class DBExerciseService {
  private readonly dBExerciseRepository: Repository<DBExercise>;

  constructor() {
    this.dBExerciseRepository = DataBase.getRepository(DBExercise);
  }

  async getById(idDBExercise: number): Promise<DBExercise | null> {
    const dBExercise = this.dBExerciseRepository.findOneBy({
      id: idDBExercise,
    });

    return dBExercise;
  }

  async getAll(): Promise<DBExercise[] | null> {
    const dBExercises = await this.dBExerciseRepository.find();
    return dBExercises;
  }

  async create(dBExerciseData: Omit<DBExercise, "id">): Promise<DBExercise> {
    const dBExercise = this.dBExerciseRepository.create(dBExerciseData);
    await this.dBExerciseRepository.save(dBExercise);

    return dBExercise;
  }

  async createMany(dBExercisesData: Omit<DBExercise, "id">[]): Promise<DBExercise[]> {
    const dBExercises = this.dBExerciseRepository.create(dBExercisesData);
    await this.dBExerciseRepository.save(dBExercises);
    return dBExercises;
  }

  async update(idDBExercise: number, dBExerciseData: Partial<DBExercise>): Promise<DBExercise | null> {
    const dBExerciseToUpdate = await this.dBExerciseRepository.findOneBy({
      id: idDBExercise,
    });

    if (dBExerciseToUpdate) {
      Object.assign(dBExerciseToUpdate, dBExerciseData);

      this.dBExerciseRepository.save(dBExerciseToUpdate);

      return dBExerciseToUpdate;
    } else {
      return null;
    }
  }

  async delete(idDBExercise: number): Promise<number | null> {
    const dBExerciseToDelete = await this.dBExerciseRepository.findOneBy({
      id: idDBExercise,
    });

    if (dBExerciseToDelete) {
      this.dBExerciseRepository.delete({ id: idDBExercise });

      return idDBExercise;
    } else {
      return null;
    }
  }
}
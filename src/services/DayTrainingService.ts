import { DataSource, Repository } from "typeorm";
import { DayTraining } from "../entities/DayTraining";
import { DataBase } from "../database/data-source";

export class DayTrainingService {
  private readonly dayTrainingRepository: Repository<DayTraining>;

  constructor() {
    this.dayTrainingRepository = DataBase.getRepository(DayTraining);
  }

  async getById(idDayTraining: number): Promise<DayTraining | null> {
    const dayTraining = this.dayTrainingRepository.findOne({
      where: { id: idDayTraining },
      relations: ["training", "exercises", "users"],
    });

    return dayTraining;
  }

  async getAllByTrainingId(idTraining: number): Promise<DayTraining[] | null> {
    const dayTrainings = await this.dayTrainingRepository.findBy({
      training: { id: idTraining },
    });

    if (dayTrainings) {
      return dayTrainings;
    } else {
      return null;
    }
  }

  async create(dayTrainingData: Omit<DayTraining, "id">): Promise<DayTraining | null> {
    const dayTraining = this.dayTrainingRepository.create(dayTrainingData);
    await this.dayTrainingRepository.save(dayTraining);

    const dayTrainingCreated = this.dayTrainingRepository.findOne({
      where: { id: dayTraining.id },
      relations: ["training", "exercises"],
    });

    return dayTrainingCreated;
  }

  async update(
    idDayTraining: number,
    dayTrainingData: Partial<DayTraining>
  ): Promise<DayTraining | null> {
    const dayTrainingToUpdate = await this.dayTrainingRepository.findOneBy({
      id: idDayTraining,
    });

    if (dayTrainingToUpdate) {
      Object.assign(dayTrainingToUpdate, dayTrainingData);

      this.dayTrainingRepository.save(dayTrainingToUpdate);

      return dayTrainingToUpdate;
    } else {
      return null;
    }
  }

  async delete(idDayTraining: number): Promise<number | null> {
    const dayTrainingToDelete = await this.dayTrainingRepository.findOneBy({
      id: idDayTraining,
    });

    if (dayTrainingToDelete) {
      this.dayTrainingRepository.delete({ id: idDayTraining });

      return idDayTraining;
    } else {
      return null;
    }
  }
}

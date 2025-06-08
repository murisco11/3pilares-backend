import { Repository } from "typeorm";
import { Training } from "../entities/Training";
import { DataBase } from "../database/data-source";

export class TrainingService {
  private readonly trainingRepository: Repository<Training>;

  constructor() {
    this.trainingRepository = DataBase.getRepository(Training);
  }

  getById = async (idTraining: number): Promise<Training | null> => {
    const training = await this.trainingRepository.findOne({
      where: { id: idTraining },
      relations: ["user"],
    });

    return training;
  };

  create = async (
    trainingData: Omit<Training, "id">
  ): Promise<Training | null> => {
    const training = this.trainingRepository.create(trainingData);
    await this.trainingRepository.save(training);

    const trainingCreated = this.trainingRepository.findOne({
      where: { id: training.id },
      relations: ["user"],
    });

    return trainingCreated;
  };

  async update(idTraining: number, trainingData: Partial<Training>): Promise<Training | null> {
    const trainingToUptade = await this.trainingRepository.findOneBy({
      id: idTraining,
    });

    if (trainingToUptade) {
      Object.assign(trainingToUptade, trainingData);

      this.trainingRepository.save(trainingToUptade);

      return trainingToUptade;
    } else {
      return null;
    }
  }

  delete = async (idTraining: number): Promise<number | null> => {
    const trainingToDelete = await this.trainingRepository.findOneBy({
      id: idTraining,
    });

    if (trainingToDelete) {
      this.trainingRepository.delete({ id: idTraining });

      return idTraining;
    } else {
      return null;
    }
  };
}

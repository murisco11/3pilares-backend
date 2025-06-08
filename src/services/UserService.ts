import { Repository } from "typeorm";
import { User } from "../entities/User";
import { DataBase } from "../database/data-source";

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = DataBase.getRepository(User);
  }

  async findById(idUser: number): Promise<User | null> {
    const user = this.userRepository.findOneBy({
      id: idUser,
    });

    return user;
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }

  async update(idUser: number, userData: Partial<User>): Promise<User | null> {
    const userToUpdate = await this.userRepository.findOneBy({
      id: idUser,
    });

    if (userToUpdate) {
      Object.assign(userToUpdate, userData);

      this.userRepository.save(userToUpdate);

      return userToUpdate;
    } else {
      return null;
    }
  }

  async delete(idUser: number): Promise<number | null> {
    const userToDelete = await this.userRepository.findOneBy({
      id: idUser,
    });

    if (userToDelete) {
      this.userRepository.delete({ id: idUser });

      return idUser;
    } else {
      return null;
    }
  }
}

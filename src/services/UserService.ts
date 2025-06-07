import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../database/data-source';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    const user = this.userRepository.findOneBy({
      id: id
    })

    return user
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }
}

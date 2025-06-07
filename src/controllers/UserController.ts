import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idUser: number = req.body.id
      const user = await this.userService.findById(idUser);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error on server' });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userData = req.body
      const newUser = await this.userService.create(userData)

      return res.status(201).json(newUser)
    }
    catch (error) {
      return res.status(500).json({ message: 'Error on server' });
    }
  }
}
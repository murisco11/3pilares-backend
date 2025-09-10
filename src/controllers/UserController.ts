import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const idUser: number = Number(req.params.id);
      const userIdFromToken = req.user?.id;

      if (req.user.role !== 'admin' && req.user.id !== idUser) {
        return res.status(403).json({ message: "Forbidden: You don't have permission to access this user" });
      }

      const user = await this.userService.getById(idUser);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userData: User = req.body;

      const newUser = await this.userService.create(userData);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userData: User = req.body;

      const updateUser = await this.userService.update(userData.id, userData);

      if (updateUser) {
        return res.status(200).json(updateUser);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idUser: number = Number(req.params.id);

      const deleteUser = await this.userService.delete(idUser);

      if (deleteUser) {
        return res
          .status(200)
          .json({ message: "User was deleted", id: idUser });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: ", error });
    }
  };
}

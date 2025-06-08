import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idUser: number = Number(req.params.id);

      const user = await this.userService.findById(idUser);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(300).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error on server" });
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

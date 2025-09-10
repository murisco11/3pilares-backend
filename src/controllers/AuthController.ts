import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { User } from "../types/UsersTypes";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user: User | null = await this.authService.login(email, password);

            if (user) {
                const token = await this.authService.generateToken({ id: user.id, email: user.email, role: user.role });
                return res.status(200).json({ user, token });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error });
        }
    }
}


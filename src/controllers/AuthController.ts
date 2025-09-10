import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response): Promise<Response> {
        if (req.body.username === "admin" && req.body.password === "admin") {
            const adminPayload = {
                id: 2,
                username: "admin",
                role: "admin"
            };
            const token = await this.authService.generateToken(adminPayload);
            return res.status(200).json({ message: "login successful", "token": token })
        } else {
            return res.status(401).json({ message: "invalid credentials" })
        }
    }
}


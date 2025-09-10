import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserService } from './UserService';
import { User } from '../types/UsersTypes';

dotenv.config();

export class AuthService {
    private readonly UserService: UserService;

    constructor() {
        this.UserService = new UserService();
    }

    async generateToken(payload: object): Promise<string> {
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'default_secret', 
            { expiresIn: '1h' }
        )
        return token;
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.UserService.findByEmail(email);

        if (user) {
            const isPasswordValid = await this.UserService.verifyPassword(user, password);
            if (isPasswordValid) {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            } else {
                return null;
            }
        }
        return null;
    }

    async verifyToken(token: string): Promise<object | null> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
            return decoded as object;
        } catch (error) {
            return null;
        }
    }
}
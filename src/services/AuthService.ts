import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    async generateToken(payload: object): Promise<string> {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: parseInt(process.env.JWT_EXPIRES as string, 10) || '1h' }
        )
        return token;
    }
}
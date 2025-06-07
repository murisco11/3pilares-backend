import express from 'express';
import { userRoutes } from './routes/userRoutes';

const app = express(); // App do Express

app.use(express.json()); // O Express utilizará JSON nas requisições

app.use('/users', userRoutes); // Rota "users" utilizará userRoutes 

export { app };
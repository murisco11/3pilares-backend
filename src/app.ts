import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { trainingRoutes } from "./routes/trainingRoutes";

const app = express(); // App do Express

app.use(express.json()); // O Express utilizará JSON nas requisições

app.use("/users", userRoutes); // Rota "users" utilizará userRoutes
app.use("/training", trainingRoutes); // Rota "training" utilizará userRoutes

export { app };

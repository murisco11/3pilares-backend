import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { trainingRoutes } from "./routes/trainingRoutes";
import { dayTrainingRoutes } from "./routes/dayTrainingRoutes";
import { dBExerciseRoutes } from "./routes/dBExerciseRoutes";

const app = express(); // App do Express

app.use(express.json()); // O Express utilizará JSON nas requisições

app.use("/users", userRoutes); // Rota "users" utilizará userRoutes
app.use("/training", trainingRoutes); // Rota "training" utilizará userRoutes
app.use("/daytraining", dayTrainingRoutes); // Rota "training" utilizará userRoutes
app.use("/dbexercise", dBExerciseRoutes); // Rota "dbexercise" utilizará dbExerciseRoutes

export { app };

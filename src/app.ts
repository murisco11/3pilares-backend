import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { trainingRoutes } from "./routes/trainingRoutes";
import { dayTrainingRoutes } from "./routes/dayTrainingRoutes";
import { dBExerciseRoutes } from "./routes/dBExerciseRoutes";
import { exerciseRoutes } from "./routes/exerciseRoutes";
import { registerDayTrainingRoutes } from "./routes/RegisterDayTrainingRoutes";
import { registerExerciseRoutes } from "./routes/RegisterExerciseRoutes";
import { registerSerieRoutes } from "./routes/registerSerieRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = express(); // App do Express

app.use(express.json()); // O Express utilizará JSON nas requisições

app.use("/users", userRoutes); // Rota "users" utilizará userRoutes
app.use("/training", trainingRoutes); // Rota "training" utilizará userRoutes
app.use("/daytraining", dayTrainingRoutes); // Rota "training" utilizrá userRoutes
app.use("/dbexercise", dBExerciseRoutes); // Rota "dbexercise" utilizará dbExerciseRoutes
app.use("/exercise", exerciseRoutes); // Rota "exercise" utilizará exerciseRoutes
app.use("/registerexercise", registerExerciseRoutes); // Rota "registerExercise" utilizará exerciseRoutes
app.use("/registerdaytraining", registerDayTrainingRoutes); // Rota "registerDayTraining" utilizará exerciseRoutes
app.use("/registerserie", registerSerieRoutes); // Rota "registerSerie" utilizará exerciseRoutes
app.use("/auth", authRoutes); // Rota "auth" utilizará authRoutes

export { app };
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Training } from "./Training";
import { RegisterExercise } from "./RegisterExercise";
import { RegisterSerie } from "./RegisterSeries";
import { RegisterDayTraining } from "./RegisterDayTraining";
import { Exercise } from "./Exercise";
import { DayTraining } from "./DayTraining";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  height!: number;

  @OneToMany(() => Training, (training) => training.users)
  trainings!: Training[];

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight!: number;

  @Column({ type: "enum", enum: ["user", "coach", "admin"] })
  role!: "user" | "coach" | "admin";

  @OneToMany(() => RegisterExercise, (registerExercises) => registerExercises.users)
  registerExercises!: RegisterExercise[];

  @OneToMany(() => RegisterSerie, (registerSerie) => registerSerie.users)
  registerSeries!: RegisterSerie[];

  @OneToMany(() => RegisterDayTraining, (registerDayTraining) => registerDayTraining.users)
  registerDayTrainings!: RegisterDayTraining[];

  @OneToMany(() => Exercise, (exercise) => exercise.users)
  exercises!: Exercise[];
  
  @OneToMany(() => DayTraining, (dayTraining) => dayTraining.users)
  dayTrainings!: DayTraining[];
}

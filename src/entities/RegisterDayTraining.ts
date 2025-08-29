import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { DayTraining } from "./DayTraining";
import { RegisterExercise } from "./RegisterExercise";
@Entity("registerDayTraining")
export class RegisterDayTraining {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => DayTraining,
    (dayTraining) => dayTraining.registerDayTrainings,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_day_training" })
  dayTrainings!: DayTraining;

  @OneToMany(
    () => RegisterExercise,
    (registerExercise) => registerExercise.registerDayTraining
  )
  registerExercises!: RegisterExercise[];
}

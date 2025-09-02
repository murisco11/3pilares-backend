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
import { User } from "./User";
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

  @ManyToOne(() => User, (user) => user.registerDayTrainings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  users!: User;

  @OneToMany(
    () => RegisterExercise,
    (registerExercise) => registerExercise.registerDayTraining
  )
  registerExercises!: RegisterExercise[];
}

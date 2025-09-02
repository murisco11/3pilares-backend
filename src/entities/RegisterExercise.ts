import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Exercise } from "./Exercise";
import { RegisterSerie } from "./RegisterSeries";
import { RegisterDayTraining } from "./RegisterDayTraining";
import { User } from "./User";

@Entity("registerExercise")
export class RegisterExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.registerExericses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_exercise" })
  exercises!: Exercise;

  @ManyToOne(() => User, (user) => user.registerExercises , {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  users!: User;

  @ManyToOne(
    () => RegisterDayTraining,
    (registerDayTraining) => registerDayTraining.registerExercises,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_register_day_training" })
  registerDayTraining!: RegisterDayTraining;

  @OneToMany(
    () => RegisterSerie,
    (registerSerie) => registerSerie.registerExercises
  )
  registerSeries!: RegisterSerie[];
}

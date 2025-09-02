import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { RegisterExercise } from "./RegisterExercise";
import { User } from "./User";
@Entity("registerSerie")
export class RegisterSerie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 0 })
  weight!: number;

  @Column({ type: "int", default: 0 })
  reps!: number;

  @Column({ type: "int", default: 0 })
  order!: number;

  @ManyToOne(
    () => User,
    (user) => user.registerSeries,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_user" })
  users!: User;

  @ManyToOne(
    () => RegisterExercise,
    (registerExercise) => registerExercise.registerSeries,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_register_serie" })
  registerExercises!: RegisterExercise;
}

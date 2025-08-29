import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { RegisterExercise } from "./RegisterExercise";
@Entity("registerSerie")
export class RegisterSerie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 0 })
  weight!: number;

  @Column({ type: "int", default: 0 })
  reps!: number;

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

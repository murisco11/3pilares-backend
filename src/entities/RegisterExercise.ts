import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { Exercise } from "./Exercise";
@Entity("registerExercise")
export class RegisterExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.registerExericses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_exercise" })
  exercises!: Exercise;
}

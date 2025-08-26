import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Exercise } from "./Exercise";

@Entity("dBExercise")
export class DBExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
    muscle_group!: string;

  @OneToMany(() => Exercise, (exercise) => exercise.dBExcercise)
  exercises!: Exercise[];
}
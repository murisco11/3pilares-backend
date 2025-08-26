import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Training } from "./Training";
import { DBExercise } from "./DBExercise";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  day!: number;

  @ManyToOne(() => DBExercise, (dBExercise) => dBExercise.exercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_dBExercise" })
  dBExcercise!: DBExercise;
}

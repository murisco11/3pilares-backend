import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { DBExercise } from "./DBExercise";
import { DayTraining } from "./DayTraining";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, default: "" })
  obs!: string;

  @Column({ type: "int" })
  series!: number;

  @Column({ length: 1000 })
  reps!: string;

  @ManyToOne(() => DayTraining, (dayTraining) => dayTraining.exercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_day_training" })
  dayTraining!: DayTraining;

  @ManyToOne(() => DBExercise, (dbExercise) => dbExercise.exercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_db_exercise" })
  dbExercise!: DBExercise;
}

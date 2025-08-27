import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Training } from "./Training";
import { Exercise } from "./Exercise";

@Entity("dayTraining")
export class DayTraining {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  day!: number;

  @ManyToOne(() => Training, (training) => training.dayTrainings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_training" })
  training!: Training;

  @OneToMany(() => Exercise, (exercise) => exercise.dayTraining, {
    cascade: true,
  })
  exercises!: Exercise[];
}

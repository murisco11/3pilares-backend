import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Training } from "./Training";

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
}
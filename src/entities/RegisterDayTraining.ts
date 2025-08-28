import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { DayTraining } from "./DayTraining";
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
}

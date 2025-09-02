import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { DBExercise } from "./DBExercise";
import { DayTraining } from "./DayTraining";
import { RegisterExercise } from "./RegisterExercise";
import { User } from "./User";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, default: "" })
  obs!: string;

  @Column({ type: "int" })
  series!: number;

  @Column({ type: "int", default: 120 }) // Em segundos
  rest!: number;

  @Column({ length: 1000 })
  reps!: string;

  @ManyToOne(() => User, (user) => user.exercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  users!: User;

  @OneToMany(
    () => RegisterExercise,
    (registerExercise) => registerExercise.exercises
  )
  registerExericses!: RegisterExercise[];

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

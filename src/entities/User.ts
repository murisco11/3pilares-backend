import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Training } from "./Training";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  height!: number;

  @OneToMany(() => Training, (training) => training.user)
  trainings!: Training[];

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight!: number;
}

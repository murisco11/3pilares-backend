/*
    -> Explicação de como é formado a chave estrangeira:
    1. Relação: seleciona a entidade que vai relacionar, indica qual a operação inversa (bidirecional) e por último opções da relação.
    2. Configuração da coluna: Utiliza-se o JoinColumn e geralmente o tipo é outra entidade.

*/

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("training")
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  description!: string;

  @Column()
  goal!: string;

  @Column()
  estimated_duration!: Date;

  @ManyToOne(() => User, (user) => user.trainings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user!: User;
}

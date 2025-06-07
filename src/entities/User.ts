import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 255 })
  password?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight!: number;
}
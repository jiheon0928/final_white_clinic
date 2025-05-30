import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  loginId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: 'admin' })
  role: string;
}

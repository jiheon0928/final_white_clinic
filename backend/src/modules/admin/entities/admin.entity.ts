import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  loginId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: 'admin' })
  role: string;
}

import { List } from 'src/list/entities/list.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CompleteState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => List, (list) => list.Status)
  statusLists: List[];
}

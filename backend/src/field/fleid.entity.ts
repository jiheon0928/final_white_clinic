import { List } from 'src/list/entities/list.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: string;

  @OneToMany(() => List, (list) => list.field)
  fieldLists: List[];
}

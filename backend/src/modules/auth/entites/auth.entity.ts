import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  Unique,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Benefit } from 'src/list/entities/benefit.entity';

import { List } from 'src/list/entities/list.entity';
import { Industry } from 'src/list/entities/industry.entity';

@Entity({ name: 'delivery_driver' })
@Check(`"age" >= 20`)
@Unique(['loginId'])
export class DeliveryDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 30 })
  loginId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  Significant: string;

  @Column()
  approval: boolean;

  @ManyToOne(() => Benefit, (b) => b.rider, { nullable: true, eager: true })
  benefit: Benefit;

  @OneToMany(() => List, (list) => list.rider)
  lists: List[];

  @ManyToMany(() => Industry, (industry) => industry.drivers)
  @JoinTable()
  industries: Industry[];
}

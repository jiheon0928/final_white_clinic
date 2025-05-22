import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Benefit } from 'src/list/entities/benefit.entity';
// import { BenefitEnum } from 'src/components/enum/benefit.enum';
import { List } from 'src/list/entities/list.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
  approval: boolean;

  fitType?: string;

  @ManyToOne(() => Benefit, (b) => b.driver, { nullable: true, eager: true })
  benefit: Benefit;

  @OneToMany(() => List, (list) => list.driver)
  lists: List[];
}

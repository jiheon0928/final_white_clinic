import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { CompleteState as StatusEntity } from 'src/list/entities/compliteState.entity';
import { Field } from 'src/list/entities/fleid.entity';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { PartialType } from '@nestjs/mapped-types';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  worklist: string;

  @CreateDateColumn({ type: 'timestamp' })
  registrationTime: Date;

  @Column({ type: 'varchar', length: 255 })
  reservation: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  customer: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  contact: string;

  @Column({ type: 'text', nullable: true })
  request: string;

  @Column()
  driverId: number;

  @ManyToOne(() => DeliveryDriver, { eager: true, nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: DeliveryDriver;

  @ManyToOne(() => StatusEntity, { eager: true })
  @JoinColumn({ name: 'compliteStateId' })
  compliteState: StatusEntity;

  @Column()
  compliteStateId: number;

  @ManyToOne(() => Field, { eager: true })
  @JoinColumn({ name: 'fieldId' })
  field: Field;

  @Column()
  fieldId: number;
}

export class UpdateListDto extends PartialType(List) {}

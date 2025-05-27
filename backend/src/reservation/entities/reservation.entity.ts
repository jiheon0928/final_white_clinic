import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { CompleteState as StatusEntity } from 'src/reservation/entities/compliteState.entity';
import { Industry } from 'src/reservation/entities/industry.entity';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  item: string;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp' })
  @Type(() => Date)
  visitTime: Date;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  customer: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 200 })
  detailAddress: string;

  @Column({ type: 'varchar', length: 20 })
  zipcode: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  request: string;

  @Column({ type: 'varchar', length: 255 })
  memo: string;

  @ManyToOne(() => DeliveryDriver, { eager: true, nullable: true })
  @JoinColumn({ name: 'riderId' })
  @Type(() => Number)
  rider?: DeliveryDriver;

  @ManyToOne(() => StatusEntity, { eager: true })
  @JoinColumn({ name: 'StatusId' })
  @Type(() => Number)
  status?: StatusEntity;

  @ManyToOne(() => Industry, { eager: true })
  @JoinColumn({ name: 'industryId' })
  @Type(() => Number)
  industry: Industry;
}

export class UpdateReservationDto extends PartialType(Reservation) {}

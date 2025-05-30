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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255 })
  reservationName: string;
  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  customerPhone: string;

  @Column({ type: 'text', nullable: true })
  customerRequest: string;

  @Column({ type: 'varchar', length: 20 })
  zipcode: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 200 })
  detailAddress: string;

  @Column({ type: 'timestamp' })
  @Type(() => Date)
  visitTime: Date;

  @Column({ type: 'varchar', length: 255 })
  memo: string;

  @Column({ type: 'int' })
  price: number;

  // 1) industryId 컬럼 추가
  @Column({ type: 'int' })
  industryId: number;
  @ManyToOne(() => Industry, { eager: true })
  @JoinColumn({ name: 'industryId' })
  industry: Industry;

  // 2) riderId 컬럼 추가 (nullable)
  @Column({ type: 'int', nullable: true })
  riderId?: number;
  @ManyToOne(() => DeliveryDriver, { eager: true, nullable: true })
  @JoinColumn({ name: 'riderId' })
  rider?: DeliveryDriver;

  // 3) statusId 컬럼 추가
  @Column({ type: 'int' })
  statusId: number;
  @ManyToOne(() => StatusEntity, { eager: true })
  @JoinColumn({ name: 'statusId' })
  status: StatusEntity;
}

export class UpdateReservationDto extends PartialType(Reservation) {}

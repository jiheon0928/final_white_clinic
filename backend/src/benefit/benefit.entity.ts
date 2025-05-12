// src/benefit/benefit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BenefitEnum } from 'src/components/enum/benefit.enum';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';

@Entity('benefit')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BenefitEnum,
    comment: '혜택 유형',
  })
  benefit: BenefitEnum;

  @ManyToOne(
    () => DeliveryDriver, // ← enum이 아니라 DeliveryDriver
    (driver) => driver.benefits,
    { nullable: false, onDelete: 'CASCADE' },
  )
  driver: DeliveryDriver; // ← 타입도 DeliveryDriver
}

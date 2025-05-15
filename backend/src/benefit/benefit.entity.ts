import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { DeliveryDriver } from 'src/registration/entities/registration.entity';

@Entity('benefit')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '혜택 유형' })
  benefitType: string;

  @ManyToOne(() => DeliveryDriver, (driver) => driver.benefits)
  driver: DeliveryDriver;
}

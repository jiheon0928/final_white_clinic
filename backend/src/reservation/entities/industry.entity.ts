// src/list/entities/industry.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';

@Entity({ name: 'industry' })
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  industry: string;

  @ManyToMany(() => DeliveryDriver, (rider) => rider.industry)
  riders: DeliveryDriver[];
}

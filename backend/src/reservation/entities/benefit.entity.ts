import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('benefit')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '혜택 유형' })
  benefitType: string;

  @OneToMany(() => DeliveryDriver, (rider) => rider.benefit)
  rider: DeliveryDriver[];
}

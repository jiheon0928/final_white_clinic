// src/modules/auth/entities/delivery-driver.entity.ts
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
import { Benefit } from 'src/reservation/entities/benefit.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Industry } from 'src/reservation/entities/industry.entity';

@Entity({ name: 'delivery_driver' })
@Check(`"age" >= 20`)
@Unique(['loginId'])
export class DeliveryDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  birth: string;

  @Column({ length: 30 })
  loginId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 200 })
  detailAddress: string;

  @Column({ length: 20 })
  zipcode: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  significant: string;

  @Column({ default: false })
  approval: boolean;

  @ManyToOne(() => Benefit, (b) => b.rider, { nullable: true, eager: true })
  benefit: Benefit;

  @OneToMany(() => Reservation, (reservation) => reservation.rider)
  reservations: Reservation[];

  @ManyToMany(() => Industry, (industry) => industry.riders)
  @JoinTable({
    name: 'industry_delivery_driver',
    joinColumn: {
      name: 'driver_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'industry_id',
      referencedColumnName: 'id',
    },
  })
  industries: Industry[];
}

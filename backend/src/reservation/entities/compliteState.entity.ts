import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CompleteState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => Reservation, (reservation) => reservation.status)
  statusReservations: Reservation[];
}

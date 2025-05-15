import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { CompleteState as StatusEntity } from 'src/compliteState/compliteState.entity';
import { Field } from 'src/field/fleid.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  worklist: string;

  // 생성 시점의 현재 시간 자동 저장
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

  // DeliveryDriver relation
  @ManyToOne(() => DeliveryDriver, { eager: true })
  @JoinColumn({ name: 'driverId' })
  driver: DeliveryDriver;

  @Column()
  driverId: number;

  // 상태 relation
  @ManyToOne(() => StatusEntity, { eager: true })
  @JoinColumn({ name: 'compliteStateId' })
  compliteState: StatusEntity;

  @Column()
  compliteStateId: number;

  // 분야 relation
  @ManyToOne(() => Field, { eager: true })
  @JoinColumn({ name: 'fieldId' })
  field: Field;

  @Column()
  fieldId: number;
}

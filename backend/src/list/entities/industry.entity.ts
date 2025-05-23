import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';

@Entity({ name: 'industry' })
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: string;

  @ManyToMany(() => DeliveryDriver, (driver) => driver.industries)
  @JoinTable({
    name: 'industry_delivery_driver', // 조인 테이블 이름
    joinColumn: {
      name: 'industry_id', // 이쪽(FK) 컬럼 이름
      referencedColumnName: 'id', // PK가 참조할 컬럼
    },
    inverseJoinColumn: {
      name: 'driver_id', // 상대쪽(FK) 컬럼 이름
      referencedColumnName: 'id',
    },
  })
  drivers: DeliveryDriver[];
}

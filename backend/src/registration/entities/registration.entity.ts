import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  Unique,
  OneToMany,
} from 'typeorm';
import { Benefit } from 'src/benefit/benefit.entity';
// import { BenefitEnum } from 'src/components/enum/benefit.enum';
import { List } from 'src/list/entities/list.entity';

@Entity({ name: 'delivery_driver' })
@Check(`"age" >= 20`)
@Unique(['loginId'])
export class DeliveryDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 30 })
  loginId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  approval: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '혜택 유형' })
  benefitType?: string;

  @OneToMany(() => Benefit, (b) => b.driver, { eager: true })
  benefits: Benefit[];

  @OneToMany(() => List, (list) => list.driver)
  lists: List[];
}

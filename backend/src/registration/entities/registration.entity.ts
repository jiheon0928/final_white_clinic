import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  Unique,
  OneToMany,
} from 'typeorm';
import { Benefit } from 'src/benefit/benefit.entity';
import { BenefitEnum } from 'src/components/enum/benefit.enum';

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

  // 수당율(enum) 컬럼
  @Column({
    type: 'enum',
    enum: BenefitEnum,
    default: BenefitEnum.RATE_40,
    comment: '수당율 (%) — 40, 50, 60 중 하나',
  })
  compensationRate: BenefitEnum;

  // Benefit 엔티티와 1:N 관계
  @OneToMany(() => Benefit, (b) => b.driver, { eager: true })
  benefits: Benefit[];
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Benefit } from '../../list/entities/benefit.entity';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { Repository } from 'typeorm';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';
import { Industry } from 'src/list/entities/industry.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,
    @InjectRepository(Benefit)
    private readonly benefitRepo: Repository<Benefit>,
  ) {}

  async findAll(): Promise<DeliveryDriver[]> {
    return this.driverRepo.find();
  }

  async findByName(name: string): Promise<DeliveryDriver> {
    return this.driverRepo.findOneOrFail({ where: { name } });
  }

  async updateInfo(id: number, dto: UpdateDriverDto): Promise<DeliveryDriver> {
    const driver = await this.driverRepo.findOneOrFail({ where: { id } });

    Object.assign(driver, dto);

    return this.driverRepo.save(driver);
  }

  async update(id: number, dto: UpdateDriverDto): Promise<DeliveryDriver> {
    // 1) 기존 드라이버를 찾되, 없으면 내부적으로 예외 발생
    const driver = await this.driverRepo.findOneOrFail({
      where: { id },
      relations: ['benefit', 'industries'],
    });

    // 2) benefitId가 주어졌으면 findOneOrFail로 바로 조회 → driver.benefit에 할당
    const benefit = await this.benefitRepo.findOneOrFail({
      where: { id: dto.benefitId },
    });
    driver.benefit = benefit;

    // 3) approval undefined면 false, 아니면 dto.approval 그대로
    if (driver.approval === false) {
      driver.approval = true;
    }

    // 4) industryIds가 있으면 id 매핑, 없으면 빈 배열
    driver.industries =
      dto.industryIds?.map((id) => ({ id }) as Industry) ?? [];

    // 5) DTO에서 relation용 키만 빼고 나머지 필드를 한 번에 덮어쓰기
    const { benefitId, approval, industryIds, ...rest } = dto;
    Object.assign(driver, rest);

    // 6) 저장
    return await this.driverRepo.save(driver);
  }
}

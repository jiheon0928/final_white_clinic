import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Benefit } from '../../reservation/entities/benefit.entity';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { In, Repository } from 'typeorm';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';
import { Industry } from 'src/reservation/entities/industry.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,
    @InjectRepository(Benefit)
    private readonly benefitRepo: Repository<Benefit>,
    @InjectRepository(Industry)
    private readonly industryRepo: Repository<Industry>,
  ) {}

  //========================기사 전체 조회========================
  async findAll(): Promise<DeliveryDriver[]> {
    return this.driverRepo.find();
  }

  //========================기사 승인 비승인 조회========================
  async findStatus(approval: boolean): Promise<DeliveryDriver[]> {
    return this.driverRepo.find({
      where: { approval },
    });
  }

  //========================기사 정보 조회========================
  async findById(id: number): Promise<DeliveryDriver> {
    return this.driverRepo.findOneOrFail({ where: { id } });
  }

  //========================기사 정보 수정========================
  async updateInfo(id: number, dto: UpdateDriverDto): Promise<DeliveryDriver> {
    // industries relation 같이 불러오기
    const driver = await this.driverRepo.findOneOrFail({
      where: { id },
      relations: ['industries'],
    });

    // 기본 컬럼 덮어쓰기
    Object.assign(driver, dto);

    // industryIds가 있으면 M:N 테이블 덮어쓰기
    if (dto.industryIds) {
      // 유효한 industry만 추려서
      const inds = await this.industryRepo.findBy({
        id: In(dto.industryIds),
      });
      if (inds.length !== dto.industryIds.length) {
        throw new NotFoundException('존재하지 않는 industryId가 있어');
      }
      driver.industries = inds;
    }

    return this.driverRepo.save(driver);
  }

  //========================기사 회원가입 승인========================

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

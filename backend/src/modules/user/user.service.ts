import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  //======================= 특정 기사  조회========================
  async findById(id: number): Promise<DeliveryDriver> {
    return this.driverRepo.findOneOrFail({
      where: { id },
      relations: ['benefit', 'industry'],
    });
  }

  //========================기사 승인 비승인 조회========================
  async findStatus(approval: boolean): Promise<DeliveryDriver[]> {
    try {
      return await this.driverRepo.find({
        where: { approval },
        relations: ['benefit', 'industry'],
        order: { id: 'ASC' },
      });
    } catch (err) {
      this.logger.error(`기사 승인 상태 조회 실패: ${err.message}`);
      throw new InternalServerErrorException(
        '기사 승인 상태 조회 중 오류가 발생했습니다',
      );
    }
  }

  //========================기사 정보 수정========================
  async updateInfo(id: number, dto: UpdateDriverDto): Promise<DeliveryDriver> {
    // benefit, industries 둘 다 같이 불러오기
    const driver = await this.driverRepo.findOneOrFail({
      where: { id },
      relations: ['benefit', 'industry'],
    });

    // 기본 필드 덮어쓰기
    Object.assign(driver, dto);

    if (dto.industry) {
      const inds = await this.industryRepo.findBy({ id: In(dto.industry) });
      if (inds.length !== dto.industry.length) {
        throw new NotFoundException('존재하지 않는 industry가 있어');
      }
      driver.industry = inds;
    }

    // benefit 처리
    if (dto.benefit) {
      const benefit = await this.benefitRepo.findOne({
        where: { id: dto.benefit },
      });
      if (!benefit) {
        throw new NotFoundException('존재하지 않는 benefit가 있어');
      }
      driver.benefit = benefit;
    }

    return this.driverRepo.save(driver);
  }

  //========================기사 회원가입 승인========================

  async approve(id: number): Promise<DeliveryDriver> {
    // 1) 드라이버 조회
    const driver = await this.driverRepo.findOneOrFail({
      where: { id },
    });

    // 2) approval 무조건 true 로 변경
    driver.approval = true;

    // 3) 저장하고 리턴
    return this.driverRepo.save(driver);
  }
}

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Benefit } from '../../list/entities/benefit.entity';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { Repository } from 'typeorm';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';

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

  async findbyName(name: string): Promise<DeliveryDriver | null> {
    return this.driverRepo.findOne({ where: { name } });
  }

  async update(name: string, dto: UpdateDriverDto): Promise<DeliveryDriver> {
    try {
      this.logger.log(`update(): name=${name}, dto=${JSON.stringify(dto)}`);
      const driver = await this.driverRepo.findOne({
        where: { name },
        relations: ['benefit'],
      });
      if (!driver)
        throw new NotFoundException(`사용자 "${name}"를 찾을 수 없습니다.`);

      // benefitId가 있으면 관계 설정
      if (dto.benefitId !== undefined) {
        const b = await this.benefitRepo.findOne({
          where: { id: dto.benefitId },
        });
        if (!b)
          throw new NotFoundException(
            `혜택 ID ${dto.benefitId}를 찾을 수 없습니다.`,
          );
        driver.benefit = b;
      }

      // dto에서 benefitId만 빼고 나머지 필드 덮어쓰기
      const { benefitId, ...rest } = dto;
      Object.assign(driver, rest);

      const saved = await this.driverRepo.save(driver);
      this.logger.log(`update(): 성공 name=${saved.name}`);
      return saved;
    } catch (e) {
      this.logger.error('update(): 예기치 못한 오류', e.stack);
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException(
        `업데이트 중 오류가 발생했습니다: ${e.message}`,
      );
    }
  }
}

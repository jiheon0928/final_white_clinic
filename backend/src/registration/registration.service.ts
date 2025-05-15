// src/registration/registration.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { DeliveryDriver } from './entities/registration.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,
  ) {}

  async register(dto: CreateRegistrationDto): Promise<DeliveryDriver> {
    const exists = await this.driverRepo.findOneBy({ loginId: dto.loginId });
    if (exists)
      throw new ConflictException('이미 존재하는 로그인 아이디입니다.');

    const hashed = await bcrypt.hash(dto.password, 10);

    const driver = this.driverRepo.create({
      ...dto,
      password: hashed,
      benefitType: dto.benefitType,
    });

    return this.driverRepo.save(driver);
  }
}

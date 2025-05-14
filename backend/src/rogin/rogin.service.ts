import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RoginService {
  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,
  ) {}

  async validate(loginId: string, plainPass: string): Promise<DeliveryDriver> {
    const driver = await this.driverRepo.findOneBy({ loginId });
    if (!driver)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸어');
    const ok = await bcrypt.compare(plainPass, driver.password);
    if (!ok) throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸어');
    return driver;
  }
}

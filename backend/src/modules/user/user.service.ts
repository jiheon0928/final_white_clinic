import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryDriver } from '../auth/entites/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(DeliveryDriver)
    private readonly driverRepo: Repository<DeliveryDriver>,
  ) {}

  async findAll(): Promise<DeliveryDriver[]> {
    return await this.driverRepo.find();
  }

  async findbyName(name: string) {
    return await this.driverRepo.findOneBy({ name });
  }

  async update(name: string, DeliveryDriver: DeliveryDriver) {
    return await this.driverRepo.update(name, DeliveryDriver);
  }
}

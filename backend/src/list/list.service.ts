// src/list/list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  async create(dto: CreateListDto): Promise<List> {
    const { driverId, fieldId, compliteStateId, ...rest } = dto;
    const entity = this.listRepo.create({
      ...rest,
      driver: { id: driverId },
      field: { id: fieldId },
      compliteState: { id: compliteStateId },
      registrationTime: new Date(),
    });
    return this.listRepo.save(entity);
  }

  async findAll(): Promise<List[]> {
    return this.listRepo.find();
  }
}

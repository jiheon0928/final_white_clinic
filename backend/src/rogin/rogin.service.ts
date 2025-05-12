import { Injectable } from '@nestjs/common';
import { CreateRoginDto } from './dto/create-rogin.dto';
import { UpdateRoginDto } from './dto/update-rogin.dto';

@Injectable()
export class RoginService {
  create(createRoginDto: CreateRoginDto) {
    return 'This action adds a new rogin';
  }

  findAll() {
    return `This action returns all rogin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rogin`;
  }

  update(id: number, updateRoginDto: UpdateRoginDto) {
    return `This action updates a #${id} rogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} rogin`;
  }
}

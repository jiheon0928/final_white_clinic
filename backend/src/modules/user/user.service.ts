import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class UserService {
  findAll(CreateDriverDto: CreateDriverDto) {
    return `This action returns all user`;
  }

  findbyName(name: string) {
    return `This action returns a #${name} user`;
  }

  update(name: string, CreateDriverDto: CreateDriverDto) {
    return `This action updates a #${name} user`;
  }
}

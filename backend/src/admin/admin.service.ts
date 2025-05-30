import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  create(dto: CreateAdminDto) {
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }

  findOneByUsername(username: string) {
    return this.adminRepo.findOne({ where: { username } });
  }

  update(id: number, dto: UpdateAdminDto) {
    return this.adminRepo.save({ id, ...dto });
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
}

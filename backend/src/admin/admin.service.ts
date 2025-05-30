import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

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

  async login(username: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { username } });

    if (!admin) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    return {
      success: true,
      message: '로그인 성공',
      accessToken: 'admin-token', // 실제로는 JWT 토큰을 발급해야 합니다
    };
  }
}

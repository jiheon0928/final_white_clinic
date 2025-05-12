// src/admin/admin.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(
    @Body() loginDto: CreateAdminDto,
  ): Promise<{ loginId: string; password: string }> {
    const { loginId, password } = loginDto;
    return this.adminService.login(loginId, password);
  }
}

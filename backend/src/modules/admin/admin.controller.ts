// src/modules/auth/admin.controller.ts
import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() dto: CreateAdminDto) {
    return this.adminService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body('loginId') loginId: string,
    @Body('password') password: string,
  ) {
    return this.adminService.login(loginId, password);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.adminService.refresh(token);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(@Body('refreshToken') token: string) {
    await this.adminService.logout(token);
  }
}

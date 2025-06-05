// src/modules/auth/admin.controller.ts
import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @ApiOperation({ summary: '관리자 회원가입' })
  async register(@Body() dto: CreateAdminDto) {
    return this.adminService.register(dto);
  }

  @HttpCode(200)
  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  async refresh(@Body('refreshToken') token: string) {
    return this.adminService.refresh(token);
  }
}

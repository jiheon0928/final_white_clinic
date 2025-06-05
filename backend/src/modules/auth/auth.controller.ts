// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDriverDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AdminService } from '../admin/admin.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '기사 회원가입' })
  async register(@Body() dto: CreateDriverDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: '기사 로그인' })
  async login(
    @Body('loginId') loginId: string,
    @Body('password') password: string,
  ) {
    if (await this.adminService.existsByLoginId(loginId)) {
      return this.adminService.login(loginId, password);
    } else {
      return this.authService.login(loginId, password);
    }
  }

  @HttpCode(200)
  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refresh(token);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Body('refreshToken') token: string) {
    await this.authService.logout(token);
  }
}

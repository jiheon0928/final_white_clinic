// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    const driver = await this.authService.validate(dto.loginId, dto.password);
    const payload = { sub: driver.id, loginId: driver.loginId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: driver.id,
        loginId: driver.loginId,
        name: driver.name,
        benefitType: driver.benefitType,
      },
    };
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body('refreshToken') refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_SECRET,
    });
    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub, loginId: payload.loginId },
      { expiresIn: '15m' },
    );
    return { accessToken: newAccessToken };
  }

  @Post('logout')
  @HttpCode(200)
  async logout() {
    // 네이티브 클라이언트 쪽에서 storage 삭제만 하면 끝
    return { message: '로그아웃 완료' };
  }
}

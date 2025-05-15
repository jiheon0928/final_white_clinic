// 3) src/auth/auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/create-rogin.dto';
import { RoginService } from './rogin.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly roginService: RoginService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const driver = await this.roginService.validate(dto.loginId, dto.password);

    const payload = { sub: driver.id, loginId: driver.loginId };
    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      id: driver.id,
      loginId: driver.loginId,
      name: driver.name,
      benefitType: driver.benefitType,
    };
  }
}

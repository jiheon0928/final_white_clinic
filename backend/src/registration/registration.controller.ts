// src/registration/registration.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { DeliveryDriver } from './entities/registration.entity';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async register(
    @Body() dto: CreateRegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<DeliveryDriver> {
    const driver = await this.registrationService.register(dto);

    const payload = { sub: driver.id, loginId: driver.loginId };
    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return driver;
  }
}

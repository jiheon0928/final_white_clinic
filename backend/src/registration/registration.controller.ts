// src/registration/registration.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { DeliveryDriver } from './entities/registration.entity';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async register(@Body() dto: CreateRegistrationDto): Promise<DeliveryDriver> {
    return this.registrationService.register(dto);
  }
}

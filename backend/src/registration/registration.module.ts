// src/registration/registration.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { DeliveryDriver } from './entities/registration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryDriver]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}

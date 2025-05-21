import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RefreshToken } from './dto/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryDriver, RefreshToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class RoginModule {}

// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshToken } from './dto/refresh-token.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DeliveryDriver } from './entites/auth.entity';
import { TokenService } from './service/token.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryDriver, RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // secret/opts는 TokenService에서 처리
  ],
  providers: [AuthService, TokenService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}

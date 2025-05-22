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
import { RefreshTokenService } from './service/refresh-token.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryDriver, RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: '111',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    JwtAuthGuard,
    RefreshTokenService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { RoginService } from './rogin.service';
import { AuthController } from './rogin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryDriver]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [RoginService],
})
export class RoginModule {}

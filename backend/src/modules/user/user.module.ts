import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { Benefit } from 'src/reservation/entities/benefit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryDriver, Benefit])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

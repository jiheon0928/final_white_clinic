import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { Benefit } from 'src/reservation/entities/benefit.entity';
import { UserSalesService } from './user.salse.service';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryDriver, Benefit, Reservation])],
  controllers: [UserController],
  providers: [UserService, UserSalesService],
})
export class UserModule {}

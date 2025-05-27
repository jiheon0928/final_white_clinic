// src/list/list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompleteState as StatusEntity } from 'src/reservation/entities/compliteState.entity';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { Industry } from './entities/industry.entity';
import { CreateReservationDto } from './dto/create-list.dto';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      DeliveryDriver,
      StatusEntity,
      Industry,
      CreateReservationDto,
    ]),
    AuthModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}

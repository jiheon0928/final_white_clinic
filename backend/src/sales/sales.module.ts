import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationModule } from 'src/reservation/reservation.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    ReservationModule,
    AuthModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}

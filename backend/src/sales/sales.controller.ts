import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  todaySales(@Body() reservation: Reservation) {
    const { id, status, ...rest } = reservation;
    return this.salesService.todaySales(reservation);
  }
}

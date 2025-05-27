import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateReservationDto } from './dto/create-list.dto';
import { Reservation } from './entities/reservation.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(dto);
  }

  @Get('pending')
  async findstate(): Promise<Reservation[]> {
    return this.reservationService.findstate();
  }

  @Patch(':name')
  async listupdate(@Param('name') name: string, @Body() list: Reservation) {
    return this.reservationService.listupdate(name, list);
  }

  @Patch(':id/pickup')
  @UseGuards(JwtAuthGuard)
  async pickup(@Param('id', ParseIntPipe) taskId: number, @Req() req: any) {
    const riderId = req.user.id;
    return this.reservationService.pickup(taskId, riderId);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(
    @Param('id') id: number,
    @Req() { user }: Request & { user: { id: number } },
  ) {
    return this.reservationService.complete(id, user.id);
  }

  @Get('weekly')
  @UseGuards(JwtAuthGuard)
  async getWeekly(@Req() req: any) {
    const riderId = req.user.id;
    return this.reservationService.getWeekly(riderId);
  }

  @Get('monthly')
  @UseGuards(JwtAuthGuard)
  async getMonthly(@Req() req: any) {
    const riderId = req.user.id;
    return this.reservationService.getMonthly(riderId);
  }

  @Get('selectDate')
  @UseGuards(JwtAuthGuard)
  async getRangeIncome(
    @Req() req: any,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const riderId = req.user.id;
    return this.reservationService.getRangeIncome(
      riderId,
      new Date(start),
      new Date(end),
    );
  }
}

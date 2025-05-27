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

import { CreateListDto } from './dto/create-list.dto';
import { Reservation } from './entities/reservation.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: CreateListDto): Promise<Reservation> {
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
    console.log(req.user);
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
  async getWeekly(
    @Param('riderId') riderId: string,
  ): Promise<{ currentWeek: number; lastWeek: number }> {
    return this.reservationService.getWeekly(+riderId);
  }

  @Get('monthly')
  async getMonthly(
    @Param('riderId') riderId: string,
  ): Promise<{ currentMonth: number; lastMonth: number }> {
    return this.reservationService.getMonthly(+riderId);
  }

  @Get('selectDate')
  async getRangeIncome(
    @Param('riderId') riderId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<{ rangeIncome: number }> {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const rangeIncome = await this.reservationService.getRangeIncome(
      +riderId,
      startDate,
      endDate,
    );
    return { rangeIncome };
  }
}

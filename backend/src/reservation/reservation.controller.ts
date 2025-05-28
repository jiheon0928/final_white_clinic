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
  BadRequestException,
} from '@nestjs/common';

import { CreateReservationDto } from './dto/create-list.dto';
import { Reservation } from './entities/reservation.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // ============================= 예약 생성 =============================
  @Post()
  async create(@Body() dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(dto);
  }

  // ============================= 상태 조회 =============================
  @Get()
  async findByStatus(
    @Query('status') status: '대기' | '진행' | '완료',
  ): Promise<Reservation[]> {
    if (!['대기', '진행', '완료'].includes(status)) {
      throw new BadRequestException(
        'status는 대기, 진행, 완료 중 하나여야 합니다.',
      );
    }
    return this.reservationService.findByStatus(status);
  }

  // ============================= 예약 정보 수정 =============================
  @Patch(':id')
  async listupdate(@Param('id') id: number, @Body() list: Reservation) {
    return this.reservationService.listupdate(id.toString(), list);
  }

  // ============================= 예약 픽업 =============================
  @Patch(':id/pickup')
  @UseGuards(JwtAuthGuard)
  async pickup(@Param('id', ParseIntPipe) taskId: number, @Req() req: any) {
    const riderId = req.user.id;
    return this.reservationService.pickup(taskId, riderId);
  }

  // ============================= 예약 완료 =============================
  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(
    @Param('id') id: number,
    @Req() { user }: Request & { user: { id: number } },
  ) {
    return this.reservationService.complete(id, user.id);
  }

  // // ============================= 주간 조회 =============================
  // @Get('rider/weekly')
  // @UseGuards(JwtAuthGuard)
  // async getWeekly(@Req() req: any, @Query('date') dateStr?: string) {
  //   const riderId = req.user.id;
  //   const refDate = dateStr ? new Date(dateStr) : new Date();
  //   if (isNaN(refDate.getTime())) {
  //     throw new BadRequestException('유효하지 않은 날짜야');
  //   }
  //   return this.reservationService.getWeeklyByDate(riderId, refDate);
  // }

  // // ============================= 월간 조회 =============================
  // @Get('rider/monthly')
  // @UseGuards(JwtAuthGuard)
  // async getMonthly(@Req() req: any, @Query('date') dateStr?: string) {
  //   const riderId = req.user.id;
  //   const refDate = dateStr ? new Date(dateStr) : new Date();
  //   if (isNaN(refDate.getTime()))
  //     throw new BadRequestException('유효하지 않은 날짜야');
  //   return this.reservationService.getMonthlyByDate(riderId, refDate);
  // }

  // // ============================= 연별 조회 =============================
  // @Get('rider/yearly')
  // @UseGuards(JwtAuthGuard)
  // async getYearly(@Req() req: any, @Query('date') dateStr?: string) {
  //   const riderId = req.user.id;
  //   const year = dateStr ? parseInt(dateStr, 10) : new Date().getFullYear();
  //   if (isNaN(year)) throw new BadRequestException('유효하지 않은 연도야');
  //   return this.reservationService.getYearlyByYear(riderId, year);
  // }
}

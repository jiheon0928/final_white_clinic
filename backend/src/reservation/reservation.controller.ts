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
import { UpdateReservationDto } from './dto/update-list.dto';
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

  // ============================= 픽업 기사용 진행 완료 조회 =============================
  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMy(
    @Req() req: any,
    @Query('status') status?: '진행' | '완료',
  ): Promise<Reservation[]> {
    const riderId = req.user.id;

    if (status) {
      // status=진행 or status=완료
      return this.reservationService.findByRiderAndStatus(riderId, status);
    }

    // status 쿼리 없으면, 픽업된 모든 예약
    return this.reservationService.findByRider(riderId);
  }

  // ============================= id로 조회 =============================
  @Get('id/:id')
  async findById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findById(id);
  }

  // ============================= 예약 정보 수정 =============================
  @Patch('id/:id')
  async listupdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ) {
    return this.reservationService.listupdate(id, dto);
  }

  // ============================= 예약 픽업 =============================
  @Patch('id/:id/pickup')
  @UseGuards(JwtAuthGuard)
  async pickup(@Param('id', ParseIntPipe) taskId: number, @Req() req: any) {
    const riderId = req.user.id;
    return this.reservationService.pickup(taskId, riderId);
  }

  // ============================= 예약 완료 =============================
  @Patch('complete/:id')
  @UseGuards(JwtAuthGuard)
  async complete(
    @Param('id') id: number,
    @Req() { user }: Request & { user: { id: number } },
  ) {
    return this.reservationService.complete(id, user.id);
  }
}

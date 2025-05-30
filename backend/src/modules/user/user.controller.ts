import { UserSalesService } from './user.salse.service';
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';
import { DeliveryDriver } from '../auth/entites/auth.entity';
import { Req, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSalesService: UserSalesService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('id/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeliveryDriver> {
    return this.userService.findById(id);
  }
  //========================기사 승인 비승인 조회========================
  @Get('approval')
  async findStatus(
    @Query('approval', ParseBoolPipe) approval: boolean,
  ): Promise<DeliveryDriver[]> {
    try {
      return await this.userService.findStatus(approval);
    } catch (err) {
      throw new BadRequestException('승인 상태 조회 중 오류가 발생했습니다');
    }
  }

  //========================기사 정보 수정========================

  @Patch('correction/:id')
  async updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.updateInfo(id, dto);
  }

  //========================기사 회원가입 승인========================

  @Patch('approval/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.approve(id);
  }

  // ============================= 주간 조회 =============================
  @Get('rider/weekly')
  @UseGuards(JwtAuthGuard)
  async getWeekly(@Req() req: any, @Query('date') dateStr?: string) {
    const riderId = req.user.id;
    const refDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(refDate.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜야');
    }
    return this.userSalesService.getWeeklyByDate(riderId, refDate);
  }

  // ============================= 월간 조회 =============================
  @Get('rider/monthly')
  @UseGuards(JwtAuthGuard)
  async getMonthly(@Req() req: any, @Query('date') dateStr?: string) {
    const riderId = req.user.id;
    const refDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(refDate.getTime()))
      throw new BadRequestException('유효하지 않은 날짜야');
    return this.userSalesService.getMonthlyByDate(riderId, refDate);
  }

  // ============================= 연별 조회 =============================
  @Get('rider/yearly')
  @UseGuards(JwtAuthGuard)
  async getYearly(@Req() req: any, @Query('date') dateStr?: string) {
    const riderId = req.user.id;
    const year = dateStr ? parseInt(dateStr, 10) : new Date().getFullYear();
    if (isNaN(year)) throw new BadRequestException('유효하지 않은 연도야');
    return this.userSalesService.getYearlyByYear(riderId, year);
  }
}

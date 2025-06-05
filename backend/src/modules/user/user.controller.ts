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
import { ApiParam } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSalesService: UserSalesService,
  ) {}

  @Get()
  @ApiOperation({ summary: '기사 전체 조회' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'ID로 기사 조회하기' })
  @ApiParam({ name: 'id', description: '기사 ID', type: 'number' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeliveryDriver> {
    return this.userService.findById(id);
  }
  //========================기사 승인 비승인 조회========================
  @Get('approval')
  @ApiOperation({ summary: '기사 승인 비승인 조회' })
  @ApiParam({ name: 'approval', description: '승인 상태', type: 'boolean' })
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
  @ApiOperation({ summary: '기사 정보 수정' })
  @ApiParam({ name: 'id', description: '기사 ID', type: 'number' })
  async updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.updateInfo(id, dto);
  }

  //========================기사 회원가입 승인========================

  @Patch('approval/:id')
  @ApiOperation({ summary: '기사 회원가입 승인' })
  @ApiParam({ name: 'id', description: '기사 ID', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.approve(id);
  }

  // ============================= 주간 조회 =============================
  @Get('rider/weekly')
  @ApiOperation({ summary: '기사 주간 조회' })
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
  @ApiOperation({ summary: '기사 월간 조회' })
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
  @ApiOperation({ summary: '기사 연별 조회' })
  @UseGuards(JwtAuthGuard)
  async getYearly(@Req() req: any, @Query('date') dateStr?: string) {
    const riderId = req.user.id;
    const year = dateStr ? parseInt(dateStr, 10) : new Date().getFullYear();
    if (isNaN(year)) throw new BadRequestException('유효하지 않은 연도야');

    // 1) 월별 집계, 주차별 집계 동시에 가져오기
    const [monthlyStats, weeklyStats] = await Promise.all([
      this.userSalesService.getMonthlySalesByYearAndRider(riderId, year),
      this.userSalesService.getWeeklySalesByYearAndRider(riderId, year),
    ]);

    // 2) 월 레이블 및 주차 레이블 정의
    const MONTH_NAMES = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const WEEK_LABELS = ['1주차', '2주차', '3주차', '4주차', '5주차'];

    // 3) 결과 초기화
    const result: Record<
      string,
      { 합산가격: number; 합산커미션: number; [week: string]: number }
    > = {};
    MONTH_NAMES.forEach((m) => {
      result[m] = {
        합산가격: 0,
        합산커미션: 0,
      };
      WEEK_LABELS.forEach((w) => {
        result[m][w] = 0;
      });
    });

    // 4) monthlyStats 채우기
    monthlyStats.forEach(({ month, totalSales, totalCommission }) => {
      const mLabel = `${month}월`;
      result[mLabel].합산가격 = totalSales;
      result[mLabel].합산커미션 = totalCommission;
    });

    // 5) weeklyStats 채우기
    weeklyStats.forEach(({ month, week, totalSales }) => {
      const mLabel = `${month}월`;
      const wLabel = `${week}주차`;
      if (result[mLabel] && result[mLabel][wLabel] !== undefined) {
        result[mLabel][wLabel] = totalSales;
      }
    });

    // 6) 반환
    return result;
  }
}

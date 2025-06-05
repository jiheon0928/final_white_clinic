import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiOperation } from '@nestjs/swagger';
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // 1) 원하는 날짜 매출 조회
  @Get('sales-by-date')
  @ApiOperation({ summary: '원하는 날짜 매출 조회' })
  async salesByDate(@Query('date') dateStr?: string) {
    const target = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(target.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜야');
    }

    const { totalSales, driverCommission, netProfit } =
      await this.salesService.getSalesByDate(target);
    return {
      totalSales: totalSales,
      totalCommission: driverCommission,
      netProfit: netProfit,
    };
  }

  //요번달 매출 조회
  @Get('monthly-sales')
  @ApiOperation({ summary: '요번달 매출 조회' })
  async monthlySales() {
    const { totalSales, totalCommission, netProfit } =
      await this.salesService.getMonthlySales();
    return {
      totalSales: totalSales,
      totalCommission: totalCommission,
      netProfit: netProfit,
    };
  }

  // 2) 해당 날짜가 속한 주의 매출 합계
  @Get('weekly-sales-summary')
  @ApiOperation({ summary: '해당 날짜가 속한 주의 매출 합계' })
  async weeklySalesSummary(@Query('date') dateStr?: string) {
    const refDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(refDate.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜야');
    }

    const { totalSales, totalCommission, netProfit } =
      await this.salesService.getWeeklySalesAggregate(refDate);

    return {
      totalSales: totalSales,
      totalCommission: totalCommission,
      netProfit: netProfit,
    };
  }

  //========================주간 요일별 매출 조회========================
  @Get('weekly-sales-by-day')
  @ApiOperation({ summary: '주간 요일별 매출 조회' })
  async weeklySalesByDay(@Query('date') dateStr?: string) {
    // 1) 기준 날짜 파싱
    const refDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(refDate.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜야');
    }

    // 2) 서비스에서 [{ date, totalSales, netProfit }, …] 받아오기
    const stats = await this.salesService.getWeeklySalesByDay(refDate);

    // 3) 요일 배열
    const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

    // 4) 매출·순수익 객체 초기화
    const salesByDay: Record<string, number> = {};
    const profitByDay: Record<string, number> = {};
    WEEK_DAYS.forEach((day) => {
      salesByDay[day] = 0;
      profitByDay[day] = 0;
    });

    // 5) 실제 값 채우기
    stats.forEach(({ date, totalSales, netProfit }) => {
      const dayName = WEEK_DAYS[new Date(date).getDay()];
      salesByDay[dayName] = totalSales;
      profitByDay[dayName] = netProfit;
    });

    // 6) 최종 반환
    return {
      totalSales: salesByDay,
      totalCommission: profitByDay,
    };
  }

  //========================년도별 월별 매출 조회========================
  @Get('yearly-sales-by-month')
  @ApiOperation({ summary: '년도별 월별 매출 조회' })
  async yearlySalesByMonth(@Query('date') dateStr?: string) {
    // 1) 연도 파싱 (없으면 올해)
    const year = dateStr ? parseInt(dateStr, 10) : new Date().getFullYear();
    if (isNaN(year)) {
      throw new BadRequestException('유효하지 않은 연도야');
    }

    // 2) 서비스에서 월별 집계와 주차별 집계를 동시에 가져오기
    //    - 기존 월별 통계: getMonthlySalesByYear
    //    - 주차별 통계     : getWeeklySalesByYear
    const [monthlyStats, weeklyStats] = await Promise.all([
      this.salesService.getMonthlySalesByYear(year),
      this.salesService.getWeeklySalesByYear(year),
    ]);

    // 3) 월 레이블(1월~12월) 및 주차 레이블(1~5주차) 정의
    const MONTH_NAMES = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const WEEK_LABELS = ['1주차', '2주차', '3주차', '4주차', '5주차'];

    // 4) 결과 초기화: 각 월마다 { 합산가격, 합산커미션, '1주차': 0, ..., '5주차': 0 }
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

    // 5) monthlyStats를 순회하면서 월 통합 데이터(합산가격, 합산커미션) 채우기
    monthlyStats.forEach(({ month, totalSales, totalCommission }) => {
      const mLabel = `${month}월`;
      result[mLabel].합산가격 = totalSales;
      result[mLabel].합산커미션 = totalCommission;
    });

    // 6) weeklyStats를 순회하면서 주차별 매출(총매출만 넣고, 월 합산은 이미 위에서 세팅됨)
    weeklyStats.forEach(({ month, week, totalSales }) => {
      const mLabel = `${month}월`;
      const wLabel = `${week}주차`;
      if (result[mLabel] && result[mLabel][wLabel] !== undefined) {
        result[mLabel][wLabel] = totalSales;
      }
    });

    // 7) 최종 반환
    return result;
  }
}

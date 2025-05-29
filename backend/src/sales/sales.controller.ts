import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // 1) 원하는 날짜 매출 조회
  @Get('sales-by-date')
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
  async yearlySalesByMonth(@Query('date') dateStr?: string) {
    // 1) 연도 파싱 (없으면 올해)
    const year = dateStr ? parseInt(dateStr, 10) : new Date().getFullYear();
    if (isNaN(year)) {
      throw new BadRequestException('유효하지 않은 연도야');
    }

    // 2) 서비스에서 [{month, totalSales, netProfit}, ...] 받아오기
    const stats = await this.salesService.getMonthlySalesByYear(year);

    // 3) 라벨(1월~12월) 생성
    const MONTH_NAMES = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

    // 4) 매출 객체, 순수익 객체 초기화
    const salesByMonth: Record<string, number> = {};
    const profitByMonth: Record<string, number> = {};
    MONTH_NAMES.forEach((m, idx) => {
      const stat = stats.find((s) => s.month === idx + 1);
      salesByMonth[m] = stat ? stat.totalSales : 0;
      profitByMonth[m] = stat ? stat.netProfit : 0;
    });

    // 5) 최종 반환
    return {
      totalSales: salesByMonth,
      totalCommission: profitByMonth,
    };
  }
}

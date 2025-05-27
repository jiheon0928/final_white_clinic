import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('date')
  async salesByDate(@Query('date') dateStr: string) {
    if (!dateStr) throw new BadRequestException('date');
    const date = new Date(dateStr);
    const result = await this.salesService.getSalesByDate(date);
    return result;
  }

  @Get('weekly')
  async weeklySales(@Query('date') dateStr: string) {
    if (!dateStr) throw new BadRequestException('date');
    const date = new Date(dateStr);
    const result = await this.salesService.getWeeklySales(date);
    return result;
  }

  @Get('monthly')
  async monthlySales(@Query('date') dateStr: string) {
    if (!dateStr) throw new BadRequestException('date');
    const date = new Date(dateStr);
    const result = await this.salesService.getMonthlySales(date);
    return result;
  }

  @Get('range')
  async rangeSales(@Query('start') start: string, @Query('end') end: string) {
    if (!start || !end) throw new BadRequestException('start, end');
    const startDate = new Date(start);
    const endDate = new Date(end);
    const result = await this.salesService.getRangeSales(startDate, endDate);
    return result;
  }

  @Get('weekly-by-day')
  async weeklySalesByDay(@Query('date') dateStr: string) {
    if (!dateStr) throw new BadRequestException('date');
    const date = new Date(dateStr);
    const result = await this.salesService.getWeeklySalesByDay(date);
    const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일별 매출을 미리 0으로 초기화
    const resultObj: Record<string, number> = {
      월: 0,
      화: 0,
      수: 0,
      목: 0,
      금: 0,
      토: 0,
      일: 0,
    };

    const raw = await result;
    raw.forEach((item) => {
      const dateObj = new Date(item.date);
      const day = daysKor[dateObj.getDay()];
      resultObj[day] = Number(item.totalSales);
    });

    return resultObj;
  }
}

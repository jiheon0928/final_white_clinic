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

  @Get('weekly-sales-by-day')
  async weeklySalesByDay(@Query('date') dateStr?: string) {
    const refDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(refDate.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    const stats = await this.salesService.getWeeklySalesByDay(refDate);

    const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    const salesByDay: Record<string, number> = WEEK_DAYS.reduce(
      (acc, day) => ({ ...acc, [day]: 0 }),
      {},
    );

    stats.forEach(({ date, totalSales }) => {
      const dayName = WEEK_DAYS[new Date(date).getDay()];
      salesByDay[dayName] = totalSales;
    });

    return salesByDay;
  }
}

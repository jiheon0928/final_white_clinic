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
}

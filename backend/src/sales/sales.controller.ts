import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('sales')
  async salesByDate(@Query('date') dateStr: string) {
    if (!dateStr) throw new BadRequestException('date');
    const date = new Date(dateStr);
    const result = await this.salesService.getSalesByDate(date);
    return result;
  }
}

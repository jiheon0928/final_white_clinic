import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() dto: CreateListDto): Promise<List> {
    return this.listService.create(dto);
  }

  @Get() //모두조회
  async findList(): Promise<List[]> {
    return this.listService.findList();
  }

  @Get('weekly') //주간 조회
  async getWeekly(
    @Param('driverId') driverId: string,
  ): Promise<{ currentWeek: number; lastWeek: number }> {
    return this.listService.getWeekly(+driverId);
  }

  @Get('monthly')
  async getMonthly(
    @Param('driverId') driverId: string,
  ): Promise<{ currentMonth: number; lastMonth: number }> {
    return this.listService.getMonthly(+driverId);
  }

  @Get('selectDate')
  async getRangeIncome(
    @Param('driverId') driverId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<{ rangeIncome: number }> {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const rangeIncome = await this.listService.getRangeIncome(
      +driverId,
      startDate,
      endDate,
    );
    return { rangeIncome };
  }
}

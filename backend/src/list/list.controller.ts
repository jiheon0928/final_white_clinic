import { Controller, Post, Body, Get } from '@nestjs/common';
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

  @Get()
  async findAll(): Promise<List[]> {
    return this.listService.findAll();
  }
}

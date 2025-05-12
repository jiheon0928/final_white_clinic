import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoginService } from './rogin.service';
import { CreateRoginDto } from './dto/create-rogin.dto';
import { UpdateRoginDto } from './dto/update-rogin.dto';

@Controller('rogin')
export class RoginController {
  constructor(private readonly roginService: RoginService) {}

  @Post()
  create(@Body() createRoginDto: CreateRoginDto) {
    return this.roginService.create(createRoginDto);
  }

  @Get()
  findAll() {
    return this.roginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoginDto: UpdateRoginDto) {
    return this.roginService.update(+id, updateRoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roginService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';
import { DeliveryDriver } from '../auth/entites/auth.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<DeliveryDriver> {
    return this.userService.findByName(name);
  }

  @Patch(':id')
  async updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.updateInfo(id, dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe로 숫자 변환
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.update(id, dto);
  }
}

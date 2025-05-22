import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { DeliveryDriver } from '../auth/entites/auth.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':name')
  async findALl(@Query('name') name: string) {
    return await this.userService.findbyName(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() DeliveryDriver: DeliveryDriver,
  ) {
    return await this.userService.update(name, DeliveryDriver);
  }
}

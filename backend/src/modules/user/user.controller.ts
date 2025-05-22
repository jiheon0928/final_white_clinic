import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDriverDto } from '../auth/dto/create-auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(CreateDriverDto: CreateDriverDto) {
    return await this.userService.findAll(CreateDriverDto);
  }

  @Get(':name')
  async findALl(@Query('name') name: string) {
    return await this.userService.findbyName(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() CreateDriverDto: CreateDriverDto,
  ) {
    return await this.userService.update(name, CreateDriverDto);
  }
}

import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
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

  @Patch(':name')
  async updateByName(
    @Param('name') name: string,
    @Body() dto: UpdateDriverDto,
  ): Promise<DeliveryDriver> {
    return this.userService.update(name, dto);
  }
}

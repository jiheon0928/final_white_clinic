import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDriverDto } from '../auth/dto/update-auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.userService.findbyName(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() dto: UpdateDriverDto) {
    return this.userService.update(name, dto);
  }
}

import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('login') // login 엔드포인트 추가
  async login(
    @Body() loginDto: LoginAdminDto,
  ): Promise<{ success: boolean; message: string; accessToken: string }> {
    const { loginId, password } = loginDto;
    return this.adminService.login(loginId, password);
  }
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}

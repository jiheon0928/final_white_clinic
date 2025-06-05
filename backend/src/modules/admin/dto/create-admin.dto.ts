import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAdminDto {
  @ApiProperty({ example: 'admin', description: '관리자 아이디' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  loginId: string;

  @ApiProperty({ example: 'admin1234@', description: '관리자 비밀번호' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}

import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  loginId: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(50)
  role?: string;
}

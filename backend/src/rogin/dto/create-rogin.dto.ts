import { IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(30)
  loginId: string;

  @IsString()
  @MaxLength(100)
  password: string;
}

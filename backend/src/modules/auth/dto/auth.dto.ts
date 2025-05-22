// src/auth/dto/create-auth.dto.ts
import { IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString()
  @Length(1, 30)
  loginId: string;

  @IsString()
  @Length(6, 100)
  password: string;
}

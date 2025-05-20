import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegistrationDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(20)
  @Type(() => Number)
  age: number;

  @IsString()
  @MaxLength(30)
  loginId: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(200)
  address: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsBoolean()
  approval: boolean;

  @IsString()
  @IsOptional()
  benefitType?: string;
}

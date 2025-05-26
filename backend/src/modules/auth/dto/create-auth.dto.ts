// src/modules/auth/dto/create-delivery-driver.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  birth: string;

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

  @IsString()
  @MaxLength(200)
  detailAddress: string;

  @IsString()
  @MaxLength(20)
  zipcode: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  significant: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  approval: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  benefitId?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  industryIds?: number[];
}

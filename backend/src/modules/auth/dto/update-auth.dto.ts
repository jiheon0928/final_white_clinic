import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from '../../auth/dto/create-auth.dto';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsString()
  loginId?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  approval?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  benefitId?: number;
}
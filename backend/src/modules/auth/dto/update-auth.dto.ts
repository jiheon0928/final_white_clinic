import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from '../../auth/dto/create-auth.dto';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  MaxLength,
  IsInt,
  Min,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(20)
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

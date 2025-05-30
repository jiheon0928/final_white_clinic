import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from '../../auth/dto/create-auth.dto';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  MaxLength,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsDate()
  @Type(() => Date)
  birth: Date;

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
  approval?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  benefit?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  industry?: number[];
}

// src/registration/dto/create-delivery-driver.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  Min,
  IsEmail,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(20)
  age: number;

  @IsString()
  @Length(1, 30)
  loginId: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsString()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Length(1, 200)
  address: string;

  @IsEmail()
  email: string;

  @Type(() => Boolean)
  @IsBoolean()
  approval: boolean;
}

export class UpdateDriverDto extends PartialType(CreateDriverDto) {}

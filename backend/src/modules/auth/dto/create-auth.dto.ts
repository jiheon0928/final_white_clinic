// src/registration/dto/create-delivery-driver.dto.ts

import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  Min,
  IsEmail,
  IsBoolean,
  IsOptional,
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

  @IsOptional()
  @IsString()
  @Length(1, 50)
  benefitType?: string;
}

// src/registration/dto/update-delivery-driver.dto.ts

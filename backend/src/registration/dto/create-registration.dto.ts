import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BenefitEnum } from 'src/components/enum/benefit.enum';
import { Entity } from 'typeorm';
@Entity()
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

  @IsEnum(BenefitEnum, { message: '수당률은 40, 50, 60 중 하나여야 합니다.' })
  @IsOptional()
  @Type(() => Number)
  compensationRate?: BenefitEnum;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import {
  IsString,
  MaxLength,
  IsInt,
  IsPositive,
  IsPhoneNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateListDto extends PartialType(CreateListDto) {
  @IsString()
  @MaxLength(255)
  item: string;

  @IsString()
  @MaxLength(255)
  visitTime: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @MaxLength(255)
  customer: string;

  @IsString()
  @MaxLength(500)
  address: string;

  @IsString()
  @MaxLength(200)
  detailAddress: string;

  @IsString()
  @MaxLength(20)
  zipcode: string;

  @IsString()
  @MaxLength(20)
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  request?: string;

  @IsString()
  @MaxLength(255)
  memo: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  riderId?: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  statusId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  industryId: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-list.dto';
import {
  IsString,
  MaxLength,
  IsInt,
  IsPositive,
  IsPhoneNumber,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsString()
  @MaxLength(255)
  reservationName: string;

  @IsDate()
  @Type(() => Date)
  visitTime: Date;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @MaxLength(255)
  customerName: string;

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
  customerPhone: string;

  @IsOptional()
  @IsString()
  customerRequest?: string;

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
  statusId?: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  industryId: number;
}

import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateReservationDto {
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
  @IsOptional()
  @Type(() => Number)
  statusId?: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  industryId: number;
}

// src/list/dto/create-list.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsInt,
  IsNotEmpty,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateListDto {
  @IsString()
  @MaxLength(255)
  item: string;

  // date는 자동 생성되므로 DTO에서 제외

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
  @MaxLength(20)
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  request?: string;

  @IsString()
  @MaxLength(255)
  memo: string;

  // 관계 필드는 ID로 받기
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

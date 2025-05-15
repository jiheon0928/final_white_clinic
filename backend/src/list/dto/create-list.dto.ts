// src/list/dto/create-list.dto.ts
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateListDto {
  @IsString() worklist: string;

  @IsString() reservation: string;

  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 0)
  price: number = 0;

  @IsString() customer: string;
  @IsString() address: string;
  @IsString() contact: string;
  @IsString() request: string;

  // FK: rider (DeliveryDriver) id
  @IsNumber()
  @Type(() => Number)
  driverId: number;

  // FK: 상태(CompliteState) id
  @IsNumber()
  @Type(() => Number)
  compliteStateId: number;

  // FK: 분야(Field) id
  @IsNumber()
  @Type(() => Number)
  fieldId: number;
}

export class UpdateListDto extends PartialType(CreateListDto) {}

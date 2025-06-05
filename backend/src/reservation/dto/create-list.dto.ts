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
import { ApiProperty } from '@nestjs/swagger';
export class CreateReservationDto {
  @ApiProperty({ example: '예약 이름', description: '예약 이름' })
  @IsString()
  @MaxLength(255)
  reservationName: string;

  @ApiProperty({ example: '2024-01-01', description: '방문 시간' })
  @IsDate()
  @Type(() => Date)
  visitTime: Date;

  @ApiProperty({ example: 100000, description: '가격' })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '홍길동', description: '고객 이름' })
  @IsString()
  @MaxLength(255)
  customerName: string;

  @ApiProperty({
    example: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 3층',
    description: '주소',
  })
  @IsString()
  @MaxLength(500)
  address: string;

  @ApiProperty({ example: '3층', description: '상세 주소' })
  @IsString()
  @MaxLength(200)
  detailAddress: string;

  @ApiProperty({ example: '12345', description: '우편번호' })
  @IsString()
  @MaxLength(20)
  zipcode: string;

  @ApiProperty({ example: '01012345678', description: '고객 전화번호' })
  @IsString()
  @MaxLength(20)
  customerPhone: string;

  @ApiProperty({ example: '주문 요청 사항', description: '주문 요청 사항' })
  @IsOptional()
  @IsString()
  customerRequest?: string;

  @ApiProperty({ example: '메모', description: '메모' })
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

  @ApiProperty({ example: 1, description: '업종' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  industry: number;
}

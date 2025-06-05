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
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiProperty({ example: '홍길동', description: '기사 이름' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: '1990-01-01', description: '기사 생년월일' })
  @IsDate()
  @Type(() => Date)
  birth: Date;

  @ApiProperty({ example: 'hong1234', description: '기사 아이디' })
  @IsString()
  @MaxLength(30)
  loginId?: string;

  @ApiProperty({ example: 'hong1234@', description: '기사 비밀번호' })
  @IsString()
  @MaxLength(100)
  password?: string;

  @ApiProperty({ example: '01012345678', description: '기사 전화번호' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({
    example: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 3층',
    description: '기사 주소',
  })
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ example: '3층', description: '기사 상세주소' })
  @IsString()
  @MaxLength(200)
  detailAddress: string;

  @ApiProperty({ example: '12345', description: '기사 우편번호' })
  @IsString()
  @MaxLength(20)
  zipcode: string;

  @ApiProperty({ example: 'hong1234@gmail.com', description: '기사 이메일' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: '기사', description: '기사 중요 사항' })
  @IsString()
  significant: string;

  @ApiProperty({ example: '기사', description: '기사 역할' })
  @IsString()
  @MaxLength(50)
  role?: string;

  @ApiProperty({ description: '기사 승인 여부' })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  approval?: boolean;

  @ApiProperty({ example: 2, description: '기사 혜택' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  benefit?: number;

  @ApiProperty({ example: [1, 2, 3], description: '기사 업종' })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  industry?: number[];
}

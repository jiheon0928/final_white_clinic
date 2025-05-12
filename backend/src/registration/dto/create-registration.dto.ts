import { IsString, MaxLength, IsInt, Min, IsEnum } from 'class-validator';
import { BenefitEnum } from 'src/components/enum/benefit.enum';
// src/registration/dto/create-registration.dto.ts

export class CreateRegistrationDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(20)
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

  @IsString()
  @MaxLength(100)
  email: string;

  @IsEnum(BenefitEnum)
  BenefitEnum: BenefitEnum;
}

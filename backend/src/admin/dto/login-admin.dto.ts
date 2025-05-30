import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateRoginDto } from './create-rogin.dto';

export class UpdateRoginDto extends PartialType(CreateRoginDto) {}

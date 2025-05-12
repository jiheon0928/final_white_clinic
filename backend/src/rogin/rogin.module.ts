import { Module } from '@nestjs/common';
import { RoginService } from './rogin.service';
import { RoginController } from './rogin.controller';

@Module({
  controllers: [RoginController],
  providers: [RoginService],
})
export class RoginModule {}

// src/list/list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { CompleteState as StatusEntity } from 'src/list/entities/compliteState.entity';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { Industry } from './entities/industry.entity';
import { CreateListDto } from './dto/create-list.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      List,
      DeliveryDriver, // driver 관계
      StatusEntity, // compliteState 관계
      Industry,
      CreateListDto,
    ]),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}

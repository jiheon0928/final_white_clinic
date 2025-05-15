// src/list/list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';

import { DeliveryDriver } from 'src/registration/entities/registration.entity';
import { CompleteState as StatusEntity } from 'src/compliteState/compliteState.entity';
import { Field } from 'src/field/fleid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      List,
      DeliveryDriver, // driver 관계
      StatusEntity, // compliteState 관계
      Field, // field 관계
    ]),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}

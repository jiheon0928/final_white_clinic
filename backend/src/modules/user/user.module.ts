import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDriver } from '../auth/entites/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryDriver])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

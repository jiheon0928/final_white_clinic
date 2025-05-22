// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { RegistrationModule } from './registration/registration.module';
import { RoginModule } from './modules/auth/auth.module';
import { ListModule } from './list/list.module';
import { DeliveryDriver } from './registration/entities/registration.entity';
import { Benefit } from './list/entities/benefit.entity';
import { List } from './list/entities/list.entity';
import { CompleteState } from './list/entities/compliteState.entity';
import { Field } from './list/entities/fleid.entity';
import { RefreshToken } from './modules/auth/dto/refresh-token.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [
          DeliveryDriver,
          Benefit,
          List,
          CompleteState,
          Field,
          RefreshToken,
        ],
        synchronize: true,
      }),
    }),

    AdminModule,
    RegistrationModule,
    RoginModule,
    ListModule,
    UserModule,
  ],
})
export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { RefreshToken } from './modules/auth/dto/refresh-token.entity';
import { UserModule } from './modules/user/user.module';
import { DeliveryDriver } from './modules/auth/entites/auth.entity';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SalesModule } from './sales/sales.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { Benefit } from './reservation/entities/benefit.entity';
import { Industry } from './reservation/entities/industry.entity';
import { CompleteState } from './reservation/entities/compliteState.entity';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: '111',
        signOptions: { expiresIn: '1h' },
      }),
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
          Reservation,
          CompleteState,
          Industry,
          RefreshToken,
        ],
        synchronize: true,
      }),
    }),

    AdminModule,
    AuthModule,
    ReservationModule,
    UserModule,
    SalesModule,
  ],
})
export class AppModule {}

import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DeliveryDriver } from 'src/modules/auth/entites/auth.entity';
import { SalesModule } from 'src/sales/sales.module';
import { Industry } from './entities/industry.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CompleteState } from './entities/compliteState.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      DeliveryDriver,
      CompleteState,
      Industry,
    ]),
    AuthModule,
    forwardRef(() => SalesModule),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || '111',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}

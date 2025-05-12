// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { RegistrationModule } from './registration/registration.module';
import { RoginModule } from './rogin/rogin.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 process.env 사용 가능
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME, // 여기에 값이 있어야 함
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        /* … */
      ],
      synchronize: true,
    }),
    AdminModule,
    RegistrationModule,
    RoginModule,
    ListModule,
    // 나머지 모듈들
  ],
})
export class AppModule {}

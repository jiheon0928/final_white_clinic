// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { RegistrationModule } from './registration/registration.module';
import { RoginModule } from './rogin/rogin.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Railway 프로덕션 환경에서는 PRIVATE URL 쓰고,
        // 없으면 PUBLIC proxy URL, 그마저 없으면 로컬 DB 변수 사용
        const url =
          config.get<string>('MYSQL_URL') ??
          config.get<string>('MYSQL_PUBLIC_URL');

        if (url) {
          return {
            type: 'mysql' as const,
            url,
            entities: [__dirname + '/**/*.entity.{ts,js}'],
            synchronize: true,
          };
        }

        return {
          type: 'mysql' as const,
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: true,
        };
      },
    }),
    AdminModule,
    RegistrationModule,
    RoginModule,
    ListModule,
  ],
})
export class AppModule {}

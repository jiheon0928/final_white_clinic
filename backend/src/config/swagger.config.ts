import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('My 서비스 API 문서')
  .setVersion('1.0.0')
  .addBearerAuth({
    // JWT 인증 스키마를 추가하고 싶으면 이 부분 설정
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'Authorization',
    in: 'header',
  })
  .build();

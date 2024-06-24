import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './base/interceptors/response.interceptor';
import { allowedOriginsConfig } from './config/config';

dotenv.config({ path: '.env' });

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(new ValidationPipe())
    .use(cookieParser())
    .useGlobalInterceptors(new ResponseInterceptor())
    .enableCors({
      credentials: true,
      origin: allowedOriginsConfig.allowedOrigins,
    });

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Boiler Plate')
    .setDescription('The Boiler Plate API Description')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();

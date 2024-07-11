import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { corsConfig } from './config/config';
import { ResponseInterceptor } from './modules/crud/interceptors/response.interceptor';

dotenv.config({ path: '.env' });

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(
      new ResponseInterceptor(),
      new ClassSerializerInterceptor(app.get(Reflector), {
        strategy: 'excludeAll',
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
    )
    .use(cookieParser())
    .enableCors({
      credentials: true,
      origin: corsConfig.allowedUrls,
    });

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Boiler Plate')
    .setDescription('The Boiler Plate API Description')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      secret: 'your-secret-key', // Replace with a strong secret key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true if using HTTPS
    }),
  );

  // Initialize Passport and restore authentication state, if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.enableCors();
  app.use(helmet());
  
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe)

  const config = new DocumentBuilder()
  .setTitle('Dance CRM API')
  .setDescription('API для приложения Dance CRM')
  .setVersion('1.0')
  .addBearerAuth({
    type: "http",
    name: "Authorization",
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: "header", 
    description: "Enter your API key" 
  }, "Authorization")
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Локальный логгер: Запрос ${ req.method } ${ req.url }`)
  next()
}
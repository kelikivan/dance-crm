import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(logger)

  const config = new DocumentBuilder()
  .setTitle('Dance CRM API')
  .setDescription('API для приложения Dance CRM')
  .setVersion('1.0')
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
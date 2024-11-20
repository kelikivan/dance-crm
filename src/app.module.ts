import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NextFunction } from 'express';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { UsersController } from './users/users.controller';
import { ClientsController } from './clients/clients.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env["DATABASE_USER"],
      password: process.env["DATABASE_PASSWORD"],
      database: process.env["DATABASE_DB"],
      entities: [],
      synchronize: true,
    }),]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      //.apply(logger)
      //.apply(cors(), helmet(), logger)
      //.exclude(
        //{ path: 'clients', method: RequestMethod.GET },
        //{ path: 'clients', method: RequestMethod.POST },
        //'clients/(.*)',
      //)
      //.forRoutes('clients')
      //.forRoutes({ path: 'clients', method: RequestMethod.GET })
      //.forRoutes(ClientsController)
      .forRoutes('*')
  }
}
function cors(): Function | import("@nestjs/common").Type<any> {
  throw new Error('Function not implemented.');
}

function helmet(): Function | import("@nestjs/common").Type<any> {
  throw new Error('Function not implemented.');
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Запрос...')
  next()
}
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NextFunction } from 'express';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { UsersController } from './users/users.controller';
import { ClientsController } from './clients/clients.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './orm/config/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ClientsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
  ]
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
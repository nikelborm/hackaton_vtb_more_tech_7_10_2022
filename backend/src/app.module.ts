import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, dbConfig } from './config';
import { AccessLogMiddleware } from './tools';
import { MockDataController } from './mock/mockData.controller';
import * as MockServices from './mock';

import {
  AuthModule,
  InfrastructureModule,
  UserModule,
  AccessScopeModule,
  FinanceModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),

    InfrastructureModule,
    AccessScopeModule,
    FinanceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [MockDataController],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}

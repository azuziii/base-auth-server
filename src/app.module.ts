import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './modules/session/session.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserMiddleware } from './modules/user/middlewars/user.middleware';
import { AuthGuard } from './modules/auth/guards/auth-guard/auth-guard.guard';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '126',
      database: 'chat',
      entities: [__dirname + '/**/*.entity.js'],
      synchronize: true,
      useUTC: true,
    }),
    UserModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}

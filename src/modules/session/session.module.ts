import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';
import { ISession } from './interfaces/session.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [
    SessionService,
    SessionRepository,
    {
      provide: ISession,
      useExisting: SessionService,
    },
  ],
  exports: [ISession],
})
export class SessionModule {}

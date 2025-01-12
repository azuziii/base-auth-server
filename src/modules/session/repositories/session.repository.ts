import { EntityManager, Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { Inject } from '@nestjs/common';

export class SessionRepository extends Repository<Session> {
  constructor(@Inject(EntityManager) entityManager: EntityManager) {
    super(Session, entityManager);
  }
}

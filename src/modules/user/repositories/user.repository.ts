import { EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {
    super(User, entityManager);
  }

  getUserById(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  getUserByUsername(username: string) {
    return this.findOne({
      where: { username },
    });
  }

  getUserByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }
}

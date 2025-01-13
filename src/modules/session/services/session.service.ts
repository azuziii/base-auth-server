import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { randomBytes } from 'crypto';
import { ISession } from '../interfaces/session.interface';
import { SessionOutput } from '../dto/session-output.dto';
import { Session } from '../entities/session.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class SessionService implements ISession {
  constructor(private readonly repository: SessionRepository) {}

  generate(): string {
    return randomBytes(32).toString('hex');
  }

  async createSession(
    userId: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<SessionOutput> {
    const sessionToken = this.generate();
    const session = await this.repository.save({
      token: sessionToken,
      ip_address: ipAddress,
      user_agent: userAgent,
      user_id: userId,
      expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });

    return {
      expires_at: session.expires_at,
      token: sessionToken,
    };
  }

  getSessionByToken(token: string): Promise<Session> {
    return this.repository.findOne({
      where: {
        token,
        expires_at: MoreThan(new Date()),
      },
    });
  }

  async setSessionAsExpired(token: string): Promise<void> {
    const session = await this.getSessionByToken(token);
    if (!session) return;
    session.expired();
    await this.repository.save(session);
  }
}

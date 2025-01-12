import { SessionOutput } from '../dto/session-output.dto';
import { Session } from '../entities/session.entity';

export const ISession = 'ISession';
export interface ISession {
  generate(): string;
  createSession(
    userId: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<SessionOutput>;
  getSessionByToken(token: string): Promise<Session>;
  setSessionAsExpired(token: string): Promise<void>;
}

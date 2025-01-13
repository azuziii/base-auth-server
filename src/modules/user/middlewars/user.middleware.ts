import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { ISession } from 'src/modules/session/interfaces/session.interface';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(IUser) private readonly userService: IUser,
    @Inject(ISession) private readonly sessionService: ISession,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const session_token = req.cookies['session_token'];
    if (!session_token) return next();

    const session = await this.sessionService.getSessionByToken(session_token);

    if (!session || session.expired()) return next();

    const user = await this.userService.getFullUser({
      id: session.user_id,
    });

    req['user'] = user;
    next();
  }
}

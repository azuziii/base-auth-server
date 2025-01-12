import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { ISession } from '../interfaces/session.interface';
import { BaseApiResponse } from 'src/core/base/dto/base-response.dto';
import { UserOutput } from 'src/modules/user/dto/user-output.dto';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  constructor(@Inject(ISession) private readonly sessionService: ISession) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      switchMap(async ({ data, meta }: BaseApiResponse<User>) => {
        const { token, expires_at } = await this.sessionService.createSession(
          data.id,
          request.ip,
          request.headers['user-agent'],
        );

        response.cookie('session_token', token, {
          httpOnly: true,
          secure: false, // TODO: check if mode is prod or not
          path: '/',
          expires: expires_at,
        });

        return {
          data: plainToInstance(UserOutput, data, {
            excludeExtraneousValues: true,
          }),
          meta,
        };
      }),
    );
  }
}

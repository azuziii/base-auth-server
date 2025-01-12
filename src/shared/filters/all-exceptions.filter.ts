import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseApiException } from '../exceptions/base-api.exception';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;

    let statusCode: number | undefined = undefined;
    let message: string | undefined = undefined;
    let errorName: string | undefined = undefined;
    let details: string | Record<string, any> | undefined = undefined;
    const language = 'en';
    let localizedMessage: string | undefined = undefined;

    if (exception instanceof BaseApiException) {
      statusCode = exception.getStatus();
      message = exception.message;
      errorName = exception.constructor.name;
      localizedMessage = exception.localizedMessage
        ? exception.localizedMessage[language]
        : undefined;
      details = exception.getResponse();
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
      errorName = exception.constructor.name;
      details = exception.getResponse();
    } else if (exception instanceof Error) {
      message = exception.message;
      errorName = exception.constructor.name;
    }

    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    errorName = errorName || 'InternalException';
    message = message || 'Internal server error';

    const error = {
      statusCode,
      message,
      localizedMessage,
      errorName,
      details,
      path,
    };

    response.status(statusCode).json(error);
  }
}

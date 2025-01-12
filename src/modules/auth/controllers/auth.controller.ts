import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginInput, RegisterInput } from '../dto/auth-input.dto';
import { BaseApiResponse } from 'src/core/base/dto/base-response.dto';
import { UserOutput } from 'src/modules/user/dto/user-output.dto';
import { SessionInterceptor } from 'src/modules/session/interceptors/session.interceptor';
import { Public } from '../decorators/public.decorator';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseInterceptors(SessionInterceptor)
  @Post('login')
  async login(@Body() input: LoginInput): Promise<BaseApiResponse<UserOutput>> {
    const user = await this.authService.login(input);
    return {
      data: user,
      meta: {},
    };
  }

  @Public()
  @UseInterceptors(SessionInterceptor)
  @Post('register')
  async register(
    @Body() input: RegisterInput,
  ): Promise<BaseApiResponse<UserOutput>> {
    const user = await this.authService.register(input);
    return {
      data: user,
      meta: {},
    };
  }

  @Post('logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.logout(request.cookies['session_token']);
    return response.clearCookie('session_token').send();
  }

  @Get('self')
  self(@Req() request: Request) {
    return plainToInstance(UserOutput, request['user'], {
      excludeExtraneousValues: true,
    });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
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
import { ClearCookieGuard } from '../guards/auth-guard/clear-cookie.guard';

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
  @UseGuards(ClearCookieGuard)
  async logout(@Req() request: Request) {
    await this.authService.logout(request.cookies['session_token']);
  }

  @Get('self')
  self(@Req() request: Request) {
    return plainToInstance(UserOutput, request['user'], {
      excludeExtraneousValues: true,
    });
  }
}

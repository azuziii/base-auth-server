import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput, RegisterInput } from '../dto/auth-input.dto';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { compare, genSalt, hash } from 'bcrypt';
import { ISession } from 'src/modules/session/interfaces/session.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUser) private readonly userService: IUser,
    @Inject(ISession) private readonly sessionService: ISession,
  ) {}

  async register({ username, email, password }: RegisterInput) {
    const doesUsernameExist =
      await this.userService.doesUsernameExist(username);
    if (doesUsernameExist) {
      throw new ConflictException('Username taken');
    }

    const doesEmailExist = await this.userService.doesEmailExist(email);
    if (doesEmailExist) {
      throw new ConflictException('Email taken');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const createdUser = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return this.login({ username, password });
  }

  async login({ username, password }: LoginInput) {
    const user = await this.userService.getFullUser({ username });
    if (!user) {
      throw new UnauthorizedException('Username or password is wrong');
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Username or password is wrong');
    }

    return user;
  }

  async logout(token: string): Promise<void> {
    await this.sessionService.setSessionAsExpired(token);
  }
}

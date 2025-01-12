import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserOutput } from '../dto/user-output.dto';
import { IUser } from '../interfaces/user.interface';
import { FindOptionsWhere } from 'typeorm';
import { RegisterInput } from 'src/modules/auth/dto/auth-input.dto';

@Injectable()
export class UserService implements IUser {
  constructor(private readonly repository: UserRepository) {}

  async createUser(user: RegisterInput): Promise<UserOutput> {
    const savedUser = await this.repository.save(user);

    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async doesUsernameExist(username: string): Promise<boolean> {
    const user = await this.repository.getUserByUsername(username);
    return !!user;
  }

  async doesEmailExist(email: string): Promise<boolean> {
    const user = await this.repository.getUserByEmail(email);
    return !!user;
  }

  async getFullUser(options?: FindOptionsWhere<User>): Promise<User> {
    const user = await this.repository.findOne({ where: options });
    return user;
  }
}

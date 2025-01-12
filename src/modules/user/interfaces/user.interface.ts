import { FindOptionsWhere } from 'typeorm';
import { CreateUserInput } from '../dto/user-input.dto';
import { UserOutput } from '../dto/user-output.dto';
import { User } from '../entities/user.entity';

export const IUser = 'IUser';
export interface IUser {
  doesEmailExist(email: string): Promise<boolean>;
  doesUsernameExist(username: string): Promise<boolean>;
  createUser(user: CreateUserInput): Promise<UserOutput>;
  getFullUser(options?: FindOptionsWhere<User>): Promise<User>;
}

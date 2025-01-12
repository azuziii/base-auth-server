import { FindOptionsWhere } from 'typeorm';
import { UserOutput } from '../dto/user-output.dto';
import { User } from '../entities/user.entity';
import { RegisterInput } from 'src/modules/auth/dto/auth-input.dto';

export const IUser = 'IUser';
export interface IUser {
  doesEmailExist(email: string): Promise<boolean>;
  doesUsernameExist(username: string): Promise<boolean>;
  createUser(user: RegisterInput): Promise<UserOutput>;
  getFullUser(options?: FindOptionsWhere<User>): Promise<User>;
}

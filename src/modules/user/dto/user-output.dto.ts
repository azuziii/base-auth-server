import { Expose } from 'class-transformer';

export class UserOutput {
  @Expose()
  username: string;
}

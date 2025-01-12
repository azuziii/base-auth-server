import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class RegisterInput {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  //   TODO: Add confirm password
}

export class LoginInput {
  // TOOD: change to work with both email and username
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

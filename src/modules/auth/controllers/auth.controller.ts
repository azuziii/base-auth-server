import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterInput } from '../dto/auth-input.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(input: RegisterInput) {
    const user = await this.authService.register(input);
  }
}

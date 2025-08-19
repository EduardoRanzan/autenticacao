import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, senha: string) {
    const user = await this.userService.findByEmail(email);

    if (!user || user.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciais inválidas, tente novamente.');
    }

    return user;
  }

  login(user: Omit<User, 'password'>): {
    access_token: string;
    user: Pick<User, 'id' | 'email' | 'fullName' | 'atelierName'>;
  } {
    const payload = {
      email: user.email,
      sub: user.id,
      fullName: user.fullName,
      atelierName: user.atelierName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        atelierName: user.atelierName,
      },
    };
  }
}

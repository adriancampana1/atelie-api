import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email ou senha inválidos',
  })
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      atelierName: string | null;
    };
  }> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    return this.authService.login(user);
  }
}

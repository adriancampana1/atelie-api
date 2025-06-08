import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'E-mail do usuário' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Senha deve ter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  password: string;
}

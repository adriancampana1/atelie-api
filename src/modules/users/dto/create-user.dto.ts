import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome precisa ser um texto' })
  fullName: string;

  @ApiProperty({ description: 'Nome do ateliê' })
  @IsNotEmpty({ message: 'Nome do ateliê é obrigatório' })
  @IsString({ message: 'Nome do ateliê precisa ser um texto' })
  atelierName: string;

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

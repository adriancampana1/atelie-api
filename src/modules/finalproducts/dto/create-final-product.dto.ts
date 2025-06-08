import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFinalProductDto {
  @ApiProperty({
    description: 'Nome do produto final',
  })
  @IsNotEmpty({ message: 'Nome do produto final é obrigatório' })
  @IsString({ message: 'Nome do produto final precisa ser um texto' })
  title: string;

  @ApiProperty({ description: 'Preço sugerido do produto final' })
  @IsNotEmpty({ message: 'Preço sugerido do produto final é obrigatório' })
  @IsDecimal(
    {
      decimal_digits: '2',
      locale: 'pt-BR',
    },
    {
      message: 'Preço sugerido do produto final deve ser um número decimal',
    },
  )
  suggestedPrice: string;

  @ApiProperty({ description: 'Estoque atual do produto final' })
  @IsNotEmpty({ message: 'Estoque atual do produto final é obrigatório' })
  @IsNumber(
    {},
    { message: 'Estoque atual do produto final deve ser um número' },
  )
  currentStock: number;

  @ApiProperty({
    description: 'URL da imagem do produto final',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'URL da imagem do produto final precisa ser um texto' })
  imageUrl?: string;
}

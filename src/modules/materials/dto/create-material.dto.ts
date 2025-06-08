import { ApiProperty } from '@nestjs/swagger';
import { UnitOfMeasure } from '@prisma/client';
import {
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ description: 'Nome do material ' })
  @IsNotEmpty({ message: 'Nome do material é obrigatório' })
  @IsString({ message: 'Nome do material precisa ser um texto' })
  title: string;

  @ApiProperty({
    description: 'Unidade de medida do material',
    enum: UnitOfMeasure,
    enumName: 'UnitOfMeasure',
  })
  @IsNotEmpty({ message: 'Unidade de medida do material é obrigatória' })
  @IsEnum(UnitOfMeasure, { message: 'Unidade de medida inválida' })
  unitOfMeasure: UnitOfMeasure;

  @ApiProperty({ description: 'Custo por unidade do material' })
  @IsNotEmpty({ message: 'Custo por unidade do material é obrigatório' })
  @IsDecimal(
    {
      locale: 'pt-BR',
      decimal_digits: '2',
    },
    {
      message: 'Custo por unidade do material deve ser um número decimal',
    },
  )
  costPerUnit: string;

  @ApiProperty({ description: 'Estoque atual do material' })
  @IsNotEmpty({ message: 'Estoque atual do material é obrigatório' })
  @IsDecimal(
    {
      locale: 'pt-BR',
      decimal_digits: '3',
    },
    {
      message: 'Estoque atual do material deve ser um número decimal',
    },
  )
  currentStock: string;

  @ApiProperty({ description: 'URL da imagem do material', required: false })
  @IsOptional()
  @IsString({ message: 'URL da imagem do material precisa ser um texto' })
  imageUrl: string;

  @ApiProperty({
    description: 'IDs das categorias do material',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'As categorias devem ser um array de IDs' })
  categoryIds?: string[];
}

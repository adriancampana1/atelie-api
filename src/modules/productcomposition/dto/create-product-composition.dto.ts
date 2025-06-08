import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCompositionDto {
  @ApiProperty({ description: 'ID do produto final' })
  @IsNotEmpty({ message: 'ID do produto final é obrigatório' })
  @IsString({ message: 'ID do produto final precisa ser um texto' })
  finalProductId: string;

  @ApiProperty({ description: 'ID do insumo' })
  @IsNotEmpty({ message: 'ID do insumo é obrigatório' })
  @IsString({ message: 'ID do insumo precisa ser um texto' })
  materialId: string;

  @ApiProperty({ description: 'Quantidade do insumo' })
  @IsNotEmpty({ message: 'Quantidade do insumo é obrigatória' })
  @IsDecimal(
    {
      decimal_digits: '3',
      locale: 'pt-BR',
    },
    {
      message: 'Quantidade do insumo deve ser um número decimal válido',
    },
  )
  quantityUsed: string;
}

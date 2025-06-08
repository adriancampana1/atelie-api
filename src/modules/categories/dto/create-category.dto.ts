import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria' })
  @IsNotEmpty({ message: 'Nome da categoria é obrigatório' })
  @IsString({ message: 'Nome da categoria precisa ser um texto' })
  name: string;
}

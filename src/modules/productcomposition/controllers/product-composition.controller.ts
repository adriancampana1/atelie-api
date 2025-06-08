import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCompositionService } from '../services/product-composition.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductCompositionDto } from '../dto/create-product-composition.dto';
import { ProductComposition } from '../types/product-composition';

@ApiTags('Composição de Produtos')
@Controller('product-composition')
export class ProductCompositionController {
  constructor(
    private readonly productCompositionService: ProductCompositionService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova composição de produto' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Composição de produto criada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos ou faltando',
  })
  async createProductComposition(
    @Body() createProductComposition: CreateProductCompositionDto,
  ): Promise<ProductComposition> {
    return this.productCompositionService.createProductComposition(
      createProductComposition,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todas as composições de produtos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de composições de produtos',
  })
  async findAllProductCompositions(): Promise<ProductComposition[]> {
    return this.productCompositionService.findAllProductCompositions();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca uma composição de produto por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Composição de produto encontrada',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Composição de produto não encontrada',
  })
  async findProductCompositionById(
    @Param('id') id: string,
  ): Promise<ProductComposition | null> {
    return this.productCompositionService.findProductCompositionById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza uma composição de produto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Composição de produto atualizada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Composição de produto não encontrada',
  })
  async updateProductComposition(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateProductCompositionDto>,
  ): Promise<ProductComposition | null> {
    return this.productCompositionService.updateProductComposition(
      id,
      updateData,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deleta uma composição de produto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Composição de produto deletada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Composição de produto não encontrada',
  })
  async deleteProductComposition(
    @Param('id') id: string,
  ): Promise<ProductComposition | null> {
    return this.productCompositionService.deleteProductComposition(id);
  }
}

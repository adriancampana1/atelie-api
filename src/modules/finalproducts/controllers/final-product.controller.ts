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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FinalProductService } from '../services/final-product.service';
import { CreateFinalProductDto } from '../dto/create-final-product.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { FinalProduct } from '../types/final-product';

@ApiTags('Produtos Finais')
@Controller('final-products')
export class FinalProductController {
  constructor(private readonly finalProductService: FinalProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo produto final' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Produto final criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao criar produto final. Tente novamente mais tarde.',
  })
  async createFinalProduct(
    @Body() createFinalProductDto: CreateFinalProductDto,
    @Request() req,
  ): Promise<FinalProduct> {
    const userId = req.user.userId;
    return this.finalProductService.createFinalProduct(
      createFinalProductDto,
      userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os produtos finais' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de produtos finais obtida com sucesso',
  })
  async findAllFinalProducts(@Request() req): Promise<FinalProduct[]> {
    const userId = req.user.userId;
    return this.finalProductService.findAllFinalProducts(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca um produto final pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto final encontrado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Produto final não encontrado ou você não tem permissão para acessá-lo.',
  })
  async findByFinalProductId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<FinalProduct | null> {
    const userId = req.user.userId;
    return this.finalProductService.findByFinalProductId(id, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um produto final pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto final atualizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Falha ao atualizar produto final. Tente novamente mais tarde.',
  })
  async updateFinalProduct(
    @Param('id') id: string,
    @Body() data: Partial<CreateFinalProductDto>,
  ): Promise<FinalProduct> {
    return this.finalProductService.updateFinalProduct(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um produto final pelo ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Produto final deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao deletar produto final. Tente novamente mais tarde.',
  })
  async deleteFinalProduct(@Param('id') id: string): Promise<void> {
    return this.finalProductService.deleteFinalProduct(id);
  }
}

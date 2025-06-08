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
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../types/category';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Categorias')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já está em uso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nome, email e senha são obrigatórios',
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req,
  ): Promise<Category> {
    const userId = req.user.userId;
    const category = await this.categoryService.create(
      createCategoryDto,
      userId,
    );
    return category;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todas as categorias do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de categorias retornada com sucesso',
  })
  async findAll(@Request() req): Promise<Category[]> {
    const userId = req.user.userId;
    const categories = await this.categoryService.findAll(userId);
    return categories;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca uma categoria pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria encontrada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada',
  })
  async findById(
    @Param('id') categoryId: string,
    @Request() req,
  ): Promise<Category | null> {
    const userId = req.user.userId;
    const category = await this.categoryService.findById(categoryId, userId);
    return category;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza uma categoria pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria atualizada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada',
  })
  async update(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: CreateCategoryDto,
    @Request() req,
  ): Promise<Category | null> {
    const userId = req.user.userId;
    const category = await this.categoryService.update(
      categoryId,
      userId,
      updateCategoryDto,
    );
    return category;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta uma categoria pelo ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Categoria deletada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada',
  })
  async delete(@Param('id') categoryId: string, @Request() req): Promise<void> {
    const userId = req.user.userId;
    await this.categoryService.delete(categoryId, userId);
  }
}

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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { Material } from '../types/material';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  imageFileFilter,
  storageFactory,
} from 'src/shared/infra/upload/file-upload.util';

@ApiTags('Insumos')
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo insumo' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Insumo criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Insumo já existe',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nome, unidade de medida e custo são obrigatórios',
  })
  async createMaterial(
    @Body() createMaterialDto: CreateMaterialDto,
    @Request() req,
  ): Promise<Material> {
    const userId = req.user.userId;
    return this.materialService.createMaterial(createMaterialDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os insumos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de insumos retornada com sucesso',
  })
  async findAllMaterials(@Request() req): Promise<Material[]> {
    const userId = req.user.userId;
    return this.materialService.findAllMaterials(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca um insumo pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Insumo encontrado com sucesso',
  })
  async findMaterialById(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Material | null> {
    const userId = req.user.userId;
    return this.materialService.findMaterialById(id, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um insumo pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Insumo atualizado com sucesso',
  })
  async updateMaterial(
    @Request() req,
    @Param('id') id: string,
    @Body() updateData: Partial<CreateMaterialDto>,
  ): Promise<Material> {
    const userId = req.user.userId;
    return this.materialService.updateMaterial(id, userId, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um insumo pelo ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Insumo deletado com sucesso',
  })
  async deleteMaterial(@Request() req, @Param('id') id: string): Promise<void> {
    const userId = req.user.userId;
    return this.materialService.deleteMaterial(id, userId);
  }

  @Post(':id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFactory('materials'),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Faz upload de imagem para um material' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Imagem enviada com sucesso',
  })
  async uploadMaterialImage(
    @Request() req,
    @Param('id') id: string,
    @UploadedFile() file: any,
  ): Promise<Material> {
    const userId = req.user.userId;
    return await this.materialService.attachImage(id, userId, file, req);
  }
}

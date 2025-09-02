import { BadRequestException, Injectable } from '@nestjs/common';
import { MaterialRepository } from '../repositories/material.repository';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { Material } from '../types/material';
import { ProductCostService } from 'src/modules/finalproducts/services/product-cost.service';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import {
  buildPublicUrl,
  deleteLocalFileByUrl,
} from 'src/shared/infra/upload/file-upload.util';

@Injectable()
export class MaterialService {
  constructor(
    private readonly materialRepository: MaterialRepository,
    private readonly productCostService: ProductCostService,
    private readonly prisma: PrismaService,
  ) {}

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
    userId: string,
  ): Promise<Material> {
    const material = await this.materialRepository.create(
      createMaterialDto,
      userId,
    );

    if (!material) {
      throw new BadRequestException(
        'Falha ao criar material. Tente novamente mais tarde.',
      );
    }

    return material;
  }

  async findAllMaterials(userId: string): Promise<Material[]> {
    const materials = await this.materialRepository.findAll(userId);

    return materials;
  }

  async findMaterialById(id: string, userId: string): Promise<Material | null> {
    const material = await this.materialRepository.findById(id, userId);

    if (!material) {
      throw new BadRequestException('Material não encontrado.');
    }

    return material;
  }

  async updateMaterial(
    id: string,
    userId: string,
    updateData: Partial<CreateMaterialDto>,
  ): Promise<Material> {
    const material = await this.materialRepository.update(
      id,
      userId,
      updateData,
    );

    if (!material) {
      throw new BadRequestException('Falha ao atualizar material.');
    }

    if (updateData.costPerUnit) {
      const compositions = await this.prisma.productComposition.findMany({
        where: { materialId: id },
        select: { finalProductId: true },
      });

      const uniqueProductIds = [
        ...new Set(compositions.map((comp) => comp.finalProductId)),
      ];
      for (const productId of uniqueProductIds) {
        await this.productCostService.updateProductCost(productId);
      }
    }

    return material;
  }

  async deleteMaterial(id: string, userId: string): Promise<void> {
    const material = await this.materialRepository.findById(id, userId);

    if (!material) {
      throw new BadRequestException('Material não encontrado.');
    }
    // Remove previous local file if exists
    if (material.imageUrl) {
      deleteLocalFileByUrl(material.imageUrl);
    }
    await this.materialRepository.delete(id, userId);
  }

  async attachImage(
    id: string,
    userId: string,
    file: any,
    req: any,
  ): Promise<Material> {
    const material = await this.materialRepository.findById(id, userId);
    if (!material) {
      throw new BadRequestException('Material não encontrado.');
    }

    const imageUrl = buildPublicUrl(req, 'materials', file.filename);

    // Clean up previous local file if any
    if (material.imageUrl) deleteLocalFileByUrl(material.imageUrl);

    const updated = await this.materialRepository.update(id, userId, {
      imageUrl,
    } as any);

    if (!updated) {
      throw new BadRequestException('Falha ao atualizar imagem do material.');
    }

    return updated;
  }
}

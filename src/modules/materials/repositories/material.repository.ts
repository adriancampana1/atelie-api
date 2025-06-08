import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { Material, materialWithRelationsSelect } from '../types/material';

@Injectable()
export class MaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createMaterialDto: CreateMaterialDto,
    userId: string,
  ): Promise<Material> {
    const material = await this.prisma.material.create({
      data: {
        title: createMaterialDto.title,
        unitOfMeasure: createMaterialDto.unitOfMeasure,
        costPerUnit: createMaterialDto.costPerUnit.replace(',', '.'),
        currentStock: createMaterialDto.currentStock.replace(',', '.'),
        imageUrl: createMaterialDto.imageUrl,
        userId: userId,
        categories: createMaterialDto.categoryIds?.length
          ? {
              connect: createMaterialDto.categoryIds.map((categoryId) => ({
                id: categoryId,
              })),
            }
          : undefined,
      },
      select: materialWithRelationsSelect,
    });

    return material;
  }

  async findAll(userId: string): Promise<Material[]> {
    const materials = await this.prisma.material.findMany({
      where: { userId },
      select: materialWithRelationsSelect,
    });

    return materials;
  }

  async findById(id: string, userId: string): Promise<Material | null> {
    const material = await this.prisma.material.findFirst({
      where: { id, userId },
      select: materialWithRelationsSelect,
    });

    return material;
  }

  async update(
    id: string,
    userId: string,
    updateData: Partial<CreateMaterialDto>,
  ): Promise<Material | null> {
    const material = await this.prisma.material.update({
      where: { id, userId },
      data: {
        title: updateData.title,
        unitOfMeasure: updateData.unitOfMeasure,
        costPerUnit: updateData.costPerUnit?.replace(',', '.'),
        currentStock: updateData.currentStock?.replace(',', '.'),
        imageUrl: updateData.imageUrl,
        categories: updateData.categoryIds?.length
          ? {
              connect: updateData.categoryIds.map((categoryId) => ({
                id: categoryId,
              })),
            }
          : undefined,
      },
      select: materialWithRelationsSelect,
    });
    return material;
  }

  async delete(id: string, userId: string): Promise<Material | null> {
    const material = await this.prisma.material.delete({
      where: { id, userId },
      select: materialWithRelationsSelect,
    });
    return material;
  }
}

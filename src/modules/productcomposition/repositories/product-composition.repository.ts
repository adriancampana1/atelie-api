import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateProductCompositionDto } from '../dto/create-product-composition.dto';
import {
  ProductComposition,
  productCompositionWithRelationsSelect,
} from '../types/product-composition';

@Injectable()
export class ProductCompositionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductCompositionDto: CreateProductCompositionDto,
  ): Promise<ProductComposition> {
    const productComposition = await this.prisma.productComposition.create({
      data: {
        finalProductId: createProductCompositionDto.finalProductId,
        materialId: createProductCompositionDto.materialId,
        quantityUsed: parseFloat(
          createProductCompositionDto.quantityUsed.replace(',', '.'),
        ),
      },
      select: productCompositionWithRelationsSelect,
    });

    return productComposition;
  }

  async findAll(): Promise<ProductComposition[]> {
    const productCompositions = await this.prisma.productComposition.findMany({
      select: productCompositionWithRelationsSelect,
    });

    return productCompositions;
  }

  async findById(id: string): Promise<ProductComposition | null> {
    const productComposition = await this.prisma.productComposition.findUnique({
      where: { id },
      select: productCompositionWithRelationsSelect,
    });
    return productComposition;
  }

  async update(
    id: string,
    updateData: Partial<CreateProductCompositionDto>,
  ): Promise<ProductComposition | null> {
    const productComposition = await this.prisma.productComposition.update({
      where: { id },
      data: {
        finalProductId: updateData.finalProductId,
        materialId: updateData.materialId,
        quantityUsed: updateData.quantityUsed
          ? parseFloat(updateData.quantityUsed.replace(',', '.'))
          : undefined,
      },
      select: productCompositionWithRelationsSelect,
    });
    return productComposition;
  }

  async delete(id: string): Promise<ProductComposition | null> {
    const productComposition = await this.prisma.productComposition.delete({
      where: { id },
      select: productCompositionWithRelationsSelect,
    });
    return productComposition;
  }
}

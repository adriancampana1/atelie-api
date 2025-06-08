import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateFinalProductDto } from '../dto/create-final-product.dto';
import {
  FinalProduct,
  finalProductWithRelations,
} from '../types/final-product';

@Injectable()
export class FinalProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createFinalProductDto: CreateFinalProductDto,
    userId: string,
  ): Promise<FinalProduct> {
    const { title, suggestedPrice, currentStock, imageUrl } =
      createFinalProductDto;

    const finalProduct = await this.prisma.finalProduct.create({
      data: {
        title,
        suggestedPrice: parseFloat(suggestedPrice),
        currentStock,
        imageUrl: imageUrl || null,
        userId,
      },
      select: finalProductWithRelations,
    });

    return finalProduct;
  }

  async findAll(userId: string): Promise<FinalProduct[]> {
    const finalProducts = await this.prisma.finalProduct.findMany({
      where: { userId },
      select: finalProductWithRelations,
    });

    return finalProducts;
  }

  async findById(id: string, userId: string): Promise<FinalProduct | null> {
    const finalProduct = await this.prisma.finalProduct.findUnique({
      where: { id, userId },
      select: finalProductWithRelations,
    });

    return finalProduct;
  }

  async update(
    id: string,
    data: Partial<CreateFinalProductDto>,
  ): Promise<FinalProduct> {
    const updatedFinalProduct = await this.prisma.finalProduct.update({
      where: { id },
      data: {
        ...data,
        suggestedPrice: data.suggestedPrice
          ? parseFloat(data.suggestedPrice)
          : undefined,
      },
      select: finalProductWithRelations,
    });

    return updatedFinalProduct;
  }

  async delete(id: string): Promise<FinalProduct> {
    const deletedFinalProduct = await this.prisma.finalProduct.delete({
      where: { id },
      select: finalProductWithRelations,
    });

    return deletedFinalProduct;
  }
}

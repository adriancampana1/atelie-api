import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/shared/infra/database/prisma.service';

@Injectable()
export class ProductCostService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateProductCost(finalProductId: string): Promise<Decimal> {
    const productCompositions = await this.prisma.productComposition.findMany({
      where: { finalProductId },
      include: { material: true },
    });

    let totalCost = new Decimal(0);

    for (const composition of productCompositions) {
      const materialCost = new Decimal(composition.material.costPerUnit).mul(
        composition.quantityUsed,
      );

      totalCost = totalCost.add(materialCost);
    }

    return totalCost;
  }

  async updateProductCost(finalProductId: string): Promise<void> {
    const calculatedCost = await this.calculateProductCost(finalProductId);

    await this.prisma.finalProduct.update({
      where: { id: finalProductId },
      data: { calculatedCost },
    });
  }
}

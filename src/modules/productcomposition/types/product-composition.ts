import { Prisma } from '@prisma/client';

export const productCompositionWithRelationsSelect = {
  id: true,
  finalProductId: true,
  materialId: true,
  quantityUsed: true,
  createdAt: true,
  updatedAt: true,
  finalProduct: {
    select: {
      id: true,
      title: true,
      suggestedPrice: true,
      categories: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  material: {
    select: {
      id: true,
      title: true,
      imageUrl: true,
      unitOfMeasure: true,
      costPerUnit: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

export type ProductComposition = Prisma.ProductCompositionGetPayload<{
  select: typeof productCompositionWithRelationsSelect;
}>;

import { Prisma } from '@prisma/client';

export const finalProductWithRelations = {
  id: true,
  title: true,
  suggestedPrice: true,
  currentStock: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  categories: {
    select: {
      id: true,
      name: true,
    },
  },
  composition: {
    select: {
      id: true,
      materialId: true,
      quantityUsed: true,
      finalProductId: true,
      material: {
        select: {
          id: true,
          title: true,
          unitOfMeasure: true,
          costPerUnit: true,
          currentStock: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        },
      },
    },
  },
};

export type FinalProduct = Prisma.FinalProductGetPayload<{
  select: typeof finalProductWithRelations;
}>;

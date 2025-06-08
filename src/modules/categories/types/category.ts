import { Prisma } from '@prisma/client';

export const categoryWithRelationsSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  finalProducts: {
    select: {
      id: true,
      title: true,
      suggestedPrice: true,
      currentStock: true,
      imageUrl: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  materials: {
    select: {
      id: true,
      title: true,
      unitOfMeasure: true,
      costPerUnit: true,
    },
  },
} as const;

export type Category = Prisma.CategoryGetPayload<{
  select: typeof categoryWithRelationsSelect;
}>;

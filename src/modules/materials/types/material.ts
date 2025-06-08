import { Prisma } from '@prisma/client';

export const materialWithRelationsSelect = {
  id: true,
  title: true,
  unitOfMeasure: true,
  costPerUnit: true,
  currentStock: true,
  imageUrl: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  categories: {
    select: {
      id: true,
      name: true,
    },
  },
};

export type Material = Prisma.MaterialGetPayload<{
  select: typeof materialWithRelationsSelect;
}>;

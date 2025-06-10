import { Prisma } from '@prisma/client';

export const userWithRelationsSelect = {
  id: true,
  email: true,
  fullName: true,
  atelierName: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  categories: {
    select: {
      id: true,
      name: true,
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
      currentStock: true,
      imageUrl: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  },
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
} as const;

export type User = Prisma.UserGetPayload<{
  select: typeof userWithRelationsSelect;
}>;

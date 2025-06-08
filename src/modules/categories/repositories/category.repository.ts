import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category, categoryWithRelationsSelect } from '../types/category';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = await this.prisma.category.create({
      data: {
        name,
        userId,
      },
      select: categoryWithRelationsSelect,
    });

    return category;
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
      select: categoryWithRelationsSelect,
    });

    return categories;
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
      select: categoryWithRelationsSelect,
    });

    return category;
  }

  async findByName(name: string, userId: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        userId,
      },
      select: categoryWithRelationsSelect,
    });
    return category;
  }

  async update(
    id: string,
    userId: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category | null> {
    const { name } = updateCategoryDto;
    const category = await this.prisma.category.update({
      where: { id, userId },
      data: { name },
      select: categoryWithRelationsSelect,
    });

    return category;
  }

  async delete(id: string, userId: string): Promise<Category | null> {
    const category = await this.prisma.category.delete({
      where: { id, userId },
      select: categoryWithRelationsSelect,
    });
    return category;
  }
}

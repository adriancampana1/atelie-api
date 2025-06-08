import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../types/category';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const existingCategory = await this.categoryRepository.findByName(
      name,
      userId,
    );
    if (existingCategory) {
      throw new BadRequestException('Já existe uma categoria com esse nome');
    }

    const category = await this.categoryRepository.create(
      createCategoryDto,
      userId,
    );
    return category;
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll(userId);
    return categories;
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    const category = await this.categoryRepository.findById(id, userId);
    if (!category) {
      throw new BadRequestException('Categoria não encontrada');
    }
    return category;
  }

  async findByName(name: string, userId: string): Promise<Category | null> {
    const category = await this.categoryRepository.findByName(name, userId);
    if (!category) {
      throw new BadRequestException('Categoria não encontrada');
    }
    return category;
  }

  async update(
    id: string,
    userId: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category | null> {
    const existingCategory = await this.categoryRepository.findById(id, userId);
    if (!existingCategory) {
      throw new BadRequestException('Categoria não encontrada');
    }
    const { name } = updateCategoryDto;
    const categoryWithSameName = await this.categoryRepository.findByName(
      name,
      userId,
    );
    if (categoryWithSameName && categoryWithSameName.id !== id) {
      throw new BadRequestException('Já existe uma categoria com esse nome');
    }
    const category = await this.categoryRepository.update(
      id,
      userId,
      updateCategoryDto,
    );
    if (!category) {
      throw new BadRequestException('Erro ao atualizar a categoria');
    }
    return category;
  }

  async delete(id: string, userId: string): Promise<Category | null> {
    const existingCategory = await this.categoryRepository.findById(id, userId);
    if (!existingCategory) {
      throw new BadRequestException('Categoria não encontrada');
    }
    const category = await this.categoryRepository.delete(id, userId);
    if (!category) {
      throw new BadRequestException('Erro ao deletar a categoria');
    }
    return category;
  }
}

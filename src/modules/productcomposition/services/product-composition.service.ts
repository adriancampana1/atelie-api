import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCompositionRepository } from '../repositories/product-composition.repository';
import { CreateProductCompositionDto } from '../dto/create-product-composition.dto';
import { ProductComposition } from '../types/product-composition';

@Injectable()
export class ProductCompositionService {
  constructor(
    private readonly productCompositionRepository: ProductCompositionRepository,
  ) {}

  async createProductComposition(
    createProductCompositionDto: CreateProductCompositionDto,
  ): Promise<ProductComposition> {
    const productComposition = await this.productCompositionRepository.create(
      createProductCompositionDto,
    );

    if (!productComposition) {
      throw new BadRequestException('Falha ao criar composição de produto');
    }

    return productComposition;
  }

  async findAllProductCompositions(): Promise<ProductComposition[]> {
    const productCompositions =
      await this.productCompositionRepository.findAll();

    if (!productCompositions || productCompositions.length === 0) {
      throw new BadRequestException('Nenhuma composição de produto encontrada');
    }

    return productCompositions;
  }

  async findProductCompositionById(
    id: string,
  ): Promise<ProductComposition | null> {
    const productComposition =
      await this.productCompositionRepository.findById(id);

    if (!productComposition) {
      throw new BadRequestException('Composição de produto não encontrada');
    }

    return productComposition;
  }

  async updateProductComposition(
    id: string,
    updateData: Partial<CreateProductCompositionDto>,
  ): Promise<ProductComposition | null> {
    const productComposition = await this.productCompositionRepository.update(
      id,
      updateData,
    );

    if (!productComposition) {
      throw new BadRequestException('Falha ao atualizar composição de produto');
    }

    return productComposition;
  }

  async deleteProductComposition(
    id: string,
  ): Promise<ProductComposition | null> {
    const productComposition =
      await this.productCompositionRepository.delete(id);

    if (!productComposition) {
      throw new BadRequestException('Falha ao deletar composição de produto');
    }

    return productComposition;
  }
}

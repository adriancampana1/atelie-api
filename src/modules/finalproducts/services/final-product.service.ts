import { BadRequestException, Injectable } from '@nestjs/common';
import { FinalProductRepository } from '../repositories/final-product.repository';
import { CreateFinalProductDto } from '../dto/create-final-product.dto';
import { FinalProduct } from '../types/final-product';

@Injectable()
export class FinalProductService {
  constructor(
    private readonly finalProductRepository: FinalProductRepository,
  ) {}

  async createFinalProduct(
    createFinalProductDto: CreateFinalProductDto,
    userId: string,
  ): Promise<FinalProduct> {
    const finalProduct = await this.finalProductRepository.create(
      createFinalProductDto,
      userId,
    );

    if (!finalProduct) {
      throw new BadRequestException(
        'Falha ao criar produto final. Tente novamente mais tarde.',
      );
    }

    return finalProduct;
  }

  async findAllFinalProducts(userId: string): Promise<FinalProduct[]> {
    const finalProducts = await this.finalProductRepository.findAll(userId);

    return finalProducts;
  }

  async findByFinalProductId(
    id: string,
    userId: string,
  ): Promise<FinalProduct | null> {
    const finalProduct = await this.finalProductRepository.findById(id, userId);
    if (!finalProduct) {
      throw new BadRequestException(
        'Produto final não encontrado ou você não tem permissão para acessá-lo.',
      );
    }

    return finalProduct;
  }

  async updateFinalProduct(
    id: string,
    data: Partial<CreateFinalProductDto>,
  ): Promise<FinalProduct> {
    const updatedFinalProduct = await this.finalProductRepository.update(
      id,
      data,
    );

    if (!updatedFinalProduct) {
      throw new BadRequestException(
        'Falha ao atualizar produto final. Tente novamente mais tarde.',
      );
    }

    return updatedFinalProduct;
  }

  async deleteFinalProduct(id: string): Promise<void> {
    const deletedFinalProduct = await this.finalProductRepository.delete(id);
    if (!deletedFinalProduct) {
      throw new BadRequestException(
        'Falha ao deletar produto final. Tente novamente mais tarde.',
      );
    }
  }
}

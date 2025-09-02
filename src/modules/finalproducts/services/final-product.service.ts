import { BadRequestException, Injectable } from '@nestjs/common';
import { FinalProductRepository } from '../repositories/final-product.repository';
import { CreateFinalProductDto } from '../dto/create-final-product.dto';
import { FinalProduct } from '../types/final-product';
import {
  buildPublicUrl,
  deleteLocalFileByUrl,
} from 'src/shared/infra/upload/file-upload.util';

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
    // Try to fetch product first to cleanup local image file
    try {
      const existing = await this.finalProductRepository.findByIdAny(id);
      if (existing?.imageUrl) {
        deleteLocalFileByUrl(existing.imageUrl);
      }
    } catch {
      // ignore
    }
    const deletedFinalProduct = await this.finalProductRepository.delete(id);
    if (!deletedFinalProduct) {
      throw new BadRequestException(
        'Falha ao deletar produto final. Tente novamente mais tarde.',
      );
    }
  }

  async attachImage(id: string, file: any, req: any): Promise<FinalProduct> {
    const product = await this.finalProductRepository.findById(
      id,
      req?.user?.userId ?? '',
    );
    if (!product) {
      throw new BadRequestException('Produto final não encontrado.');
    }

    const imageUrl = buildPublicUrl(req, 'final-products', file.filename);

    if (product.imageUrl) deleteLocalFileByUrl(product.imageUrl);

    const updated = await this.finalProductRepository.update(id, {
      imageUrl,
    } as any);
    if (!updated) {
      throw new BadRequestException(
        'Falha ao atualizar imagem do produto final.',
      );
    }
    return updated;
  }
}

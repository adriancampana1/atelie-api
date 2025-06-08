import { Module } from '@nestjs/common';
import { ProductCompositionController } from './controllers/product-composition.controller';
import { ProductCompositionService } from './services/product-composition.service';
import { ProductCompositionRepository } from './repositories/product-composition.repository';

@Module({
  imports: [],
  controllers: [ProductCompositionController],
  providers: [ProductCompositionService, ProductCompositionRepository],
  exports: [],
})
export class ProductCompositionModule {}

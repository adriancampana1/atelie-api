import { Module } from '@nestjs/common';
import { FinalProductController } from './controllers/final-product.controller';
import { FinalProductRepository } from './repositories/final-product.repository';
import { FinalProductService } from './services/final-product.service';

@Module({
  imports: [],
  controllers: [FinalProductController],
  providers: [FinalProductService, FinalProductRepository],
  exports: [],
})
export class FinalProductModule {}

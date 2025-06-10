import { Module } from '@nestjs/common';
import { FinalProductController } from './controllers/final-product.controller';
import { FinalProductRepository } from './repositories/final-product.repository';
import { FinalProductService } from './services/final-product.service';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { ProductCostService } from './services/product-cost.service';

@Module({
  imports: [],
  controllers: [FinalProductController],
  providers: [
    FinalProductService,
    FinalProductRepository,
    PrismaService,
    ProductCostService,
  ],
  exports: [ProductCostService],
})
export class FinalProductModule {}

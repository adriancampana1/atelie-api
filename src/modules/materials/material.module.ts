import { Module } from '@nestjs/common';
import { MaterialController } from './controllers/material.controller';
import { MaterialService } from './services/material.service';
import { MaterialRepository } from './repositories/material.repository';
import { FinalProductModule } from '../finalproducts/final-product.module';

@Module({
  imports: [FinalProductModule],
  controllers: [MaterialController],
  providers: [MaterialService, MaterialRepository],
  exports: [],
})
export class MaterialModule {}

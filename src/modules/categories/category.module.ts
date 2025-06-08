import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [],
})
export class CategoryModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/database/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/categories/category.module';
import { MaterialModule } from './modules/materials/material.module';
import { FinalProductModule } from './modules/finalproducts/final-product.module';
import { ProductCompositionModule } from './modules/productcomposition/product-composition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    CategoryModule,
    MaterialModule,
    FinalProductModule,
    ProductCompositionModule,
  ],
  providers: [],
})
export class AppModule {}

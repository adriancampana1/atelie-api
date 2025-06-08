-- CreateEnum
CREATE TYPE "material_movement_type" AS ENUM ('ENTRY', 'EXIT', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "final_product_movement_type" AS ENUM ('PRODUCTION', 'SALE', 'LOSS', 'DONATION', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "unit_of_measure" AS ENUM ('UNIT', 'ML', 'L', 'G', 'KG', 'CM', 'M', 'M2', 'CM2');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "atelier_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "unit_of_measure" "unit_of_measure" NOT NULL,
    "cost_per_unit" DECIMAL(10,2) NOT NULL,
    "current_stock" DECIMAL(10,3) NOT NULL,
    "image_url" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "suggested_price" DECIMAL(10,2) NOT NULL,
    "current_stock" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "final_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_compositions" (
    "id" TEXT NOT NULL,
    "final_product_id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "quantity_used" DECIMAL(10,3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_compositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productions" (
    "id" TEXT NOT NULL,
    "final_product_id" TEXT NOT NULL,
    "quantity_produced" INTEGER NOT NULL,
    "production_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_stock_movements" (
    "id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "movement_type" "material_movement_type" NOT NULL,
    "quantity" DECIMAL(10,3) NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_product_stock_movements" (
    "id" TEXT NOT NULL,
    "final_product_id" TEXT NOT NULL,
    "movement_type" "final_product_movement_type" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "final_product_stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMaterial" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToMaterial_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToFinalProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToFinalProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_user_id_name_key" ON "categories"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "materials_user_id_title_key" ON "materials"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "final_products_user_id_title_key" ON "final_products"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "product_compositions_final_product_id_material_id_key" ON "product_compositions"("final_product_id", "material_id");

-- CreateIndex
CREATE INDEX "_CategoryToMaterial_B_index" ON "_CategoryToMaterial"("B");

-- CreateIndex
CREATE INDEX "_CategoryToFinalProduct_B_index" ON "_CategoryToFinalProduct"("B");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_products" ADD CONSTRAINT "final_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_final_product_id_fkey" FOREIGN KEY ("final_product_id") REFERENCES "final_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productions" ADD CONSTRAINT "productions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productions" ADD CONSTRAINT "productions_final_product_id_fkey" FOREIGN KEY ("final_product_id") REFERENCES "final_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_stock_movements" ADD CONSTRAINT "material_stock_movements_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_product_stock_movements" ADD CONSTRAINT "final_product_stock_movements_final_product_id_fkey" FOREIGN KEY ("final_product_id") REFERENCES "final_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMaterial" ADD CONSTRAINT "_CategoryToMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMaterial" ADD CONSTRAINT "_CategoryToMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFinalProduct" ADD CONSTRAINT "_CategoryToFinalProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFinalProduct" ADD CONSTRAINT "_CategoryToFinalProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "final_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `final_product_stock_movements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_stock_movements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "final_product_stock_movements" DROP CONSTRAINT "final_product_stock_movements_final_product_id_fkey";

-- DropForeignKey
ALTER TABLE "material_stock_movements" DROP CONSTRAINT "material_stock_movements_material_id_fkey";

-- DropForeignKey
ALTER TABLE "productions" DROP CONSTRAINT "productions_final_product_id_fkey";

-- DropForeignKey
ALTER TABLE "productions" DROP CONSTRAINT "productions_user_id_fkey";

-- DropTable
DROP TABLE "final_product_stock_movements";

-- DropTable
DROP TABLE "material_stock_movements";

-- DropTable
DROP TABLE "productions";

-- DropEnum
DROP TYPE "final_product_movement_type";

-- DropEnum
DROP TYPE "material_movement_type";

/*
  Warnings:

  - You are about to drop the column `order_Id` on the `orderReturn` table. All the data in the column will be lost.
  - Added the required column `graphicsOrder_Id` to the `orderReturn` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderReturn" DROP CONSTRAINT "orderReturn_order_Id_fkey";

-- AlterTable
ALTER TABLE "orderReturn" DROP COLUMN "order_Id",
ADD COLUMN     "graphicsOrder_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orderReturn" ADD CONSTRAINT "orderReturn_graphicsOrder_Id_fkey" FOREIGN KEY ("graphicsOrder_Id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

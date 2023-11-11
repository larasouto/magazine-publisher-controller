/*
  Warnings:

  - You are about to drop the column `editon_Id` on the `order` table. All the data in the column will be lost.
  - Added the required column `edition_Id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_editon_Id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "editon_Id",
ADD COLUMN     "edition_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_edition_Id_fkey" FOREIGN KEY ("edition_Id") REFERENCES "editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `categoryAdvertising` on the `advertisements` table. All the data in the column will be lost.
  - Added the required column `category_advertising` to the `advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advertisements" DROP COLUMN "categoryAdvertising",
ADD COLUMN     "category_advertising" TEXT NOT NULL;

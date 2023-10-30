/*
  Warnings:

  - Changed the type of `number` on the `addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "complement" TEXT,
DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

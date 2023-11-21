/*
  Warnings:

  - Made the column `departure_date` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "receipt_date" DROP NOT NULL,
ALTER COLUMN "departure_date" SET NOT NULL;

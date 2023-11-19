/*
  Warnings:

  - Made the column `departure_date` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_address` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `example_number` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "departure_date" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "delivery_address" SET NOT NULL,
ALTER COLUMN "example_number" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

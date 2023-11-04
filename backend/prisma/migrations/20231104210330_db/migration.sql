/*
  Warnings:

  - Changed the type of `expiration_date` on the `coupons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "expiration_date",
ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL;

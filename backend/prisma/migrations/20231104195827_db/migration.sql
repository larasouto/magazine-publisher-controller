/*
  Warnings:

  - You are about to drop the column `maximum_amount_of_use` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `coupons` table. All the data in the column will be lost.
  - Added the required column `available_quantity` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_user_id_fkey";

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "maximum_amount_of_use",
DROP COLUMN "user_id",
ADD COLUMN     "available_quantity" INTEGER NOT NULL;

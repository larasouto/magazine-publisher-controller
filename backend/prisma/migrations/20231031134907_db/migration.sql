/*
  Warnings:

  - You are about to drop the column `payment_method` on the `orders` table. All the data in the column will be lost.
  - Added the required column `card_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment_method",
ADD COLUMN     "card_id" TEXT NOT NULL;

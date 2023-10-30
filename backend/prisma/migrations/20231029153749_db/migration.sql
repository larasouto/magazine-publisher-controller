/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `cards` table. All the data in the column will be lost.
  - Added the required column `billing_address` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "billingAddress",
ADD COLUMN     "billing_address" TEXT NOT NULL;

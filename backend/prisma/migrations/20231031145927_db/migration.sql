/*
  Warnings:

  - You are about to drop the column `costumer_id` on the `payment_subscriptions` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `payment_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment_subscriptions" DROP CONSTRAINT "payment_subscriptions_costumer_id_fkey";

-- AlterTable
ALTER TABLE "payment_subscriptions" DROP COLUMN "costumer_id",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_subscriptions" ADD CONSTRAINT "payment_subscriptions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

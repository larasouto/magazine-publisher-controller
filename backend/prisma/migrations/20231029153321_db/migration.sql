/*
  Warnings:

  - You are about to drop the column `user_id` on the `cards` table. All the data in the column will be lost.
  - Added the required column `billingAddress` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flag` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_user_id_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "user_id",
ADD COLUMN     "billingAddress" TEXT NOT NULL,
ADD COLUMN     "flag" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

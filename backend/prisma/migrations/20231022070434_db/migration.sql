/*
  Warnings:

  - Made the column `description` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `frequency` on the `subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL,
DROP COLUMN "frequency",
ADD COLUMN     "frequency" INTEGER NOT NULL;

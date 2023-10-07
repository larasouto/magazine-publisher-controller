/*
  Warnings:

  - The `publication_period` column on the `magazines` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "MagazinePublicationPeriod" AS ENUM ('ANNUALLY', 'BIANNUAL', 'MONTHLY', 'BIMONTHLY', 'WEEKLY');

-- AlterTable
ALTER TABLE "magazines" DROP COLUMN "publication_period",
ADD COLUMN     "publication_period" "MagazinePublicationPeriod" NOT NULL DEFAULT 'MONTHLY';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

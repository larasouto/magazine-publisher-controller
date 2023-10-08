/*
  Warnings:

  - The `status` column on the `photographers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `reporters` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "ReporterStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'VACATION', 'PAUSED');

-- CreateEnum
CREATE TYPE "PhotographerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'VACATION', 'PAUSED');

-- AlterTable
ALTER TABLE "photographers" DROP COLUMN "status",
ADD COLUMN     "status" "PhotographerStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "reporters" DROP COLUMN "status",
ADD COLUMN     "status" "ReporterStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

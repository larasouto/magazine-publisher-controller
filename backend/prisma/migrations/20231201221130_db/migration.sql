/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderReturn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_bookstore_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_edition_Id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_graphicsDistributor_id_fkey";

-- DropForeignKey
ALTER TABLE "orderReturn" DROP CONSTRAINT "orderReturn_graphicsOrder_Id_fkey";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "orderReturn";

-- CreateTable
CREATE TABLE "graphicsOrder" (
    "id" TEXT NOT NULL,
    "receipt_date" TIMESTAMP(3),
    "departure_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "delivery_address" TEXT NOT NULL,
    "example_number" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "edition_Id" TEXT NOT NULL,
    "graphicsDistributor_id" TEXT NOT NULL,
    "bookstore_id" TEXT NOT NULL,

    CONSTRAINT "graphicsOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graphicsOrderReturn" (
    "id" TEXT NOT NULL,
    "return_number" INTEGER NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "graphicsOrder_Id" TEXT NOT NULL,

    CONSTRAINT "graphicsOrderReturn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "graphicsOrder" ADD CONSTRAINT "graphicsOrder_edition_Id_fkey" FOREIGN KEY ("edition_Id") REFERENCES "editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graphicsOrder" ADD CONSTRAINT "graphicsOrder_graphicsDistributor_id_fkey" FOREIGN KEY ("graphicsDistributor_id") REFERENCES "graphicsOnDistributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graphicsOrder" ADD CONSTRAINT "graphicsOrder_bookstore_id_fkey" FOREIGN KEY ("bookstore_id") REFERENCES "bookstore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graphicsOrderReturn" ADD CONSTRAINT "graphicsOrderReturn_graphicsOrder_Id_fkey" FOREIGN KEY ("graphicsOrder_Id") REFERENCES "graphicsOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

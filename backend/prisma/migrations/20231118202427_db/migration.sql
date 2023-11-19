-- AlterTable
ALTER TABLE "order" ALTER COLUMN "departure_date" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "delivery_address" DROP NOT NULL,
ALTER COLUMN "example_number" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "payment_advertisings" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "card_id" TEXT NOT NULL,
    "advertising_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_advertisings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_advertisings" ADD CONSTRAINT "payment_advertisings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_advertisings" ADD CONSTRAINT "payment_advertisings_advertising_id_fkey" FOREIGN KEY ("advertising_id") REFERENCES "advertisings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

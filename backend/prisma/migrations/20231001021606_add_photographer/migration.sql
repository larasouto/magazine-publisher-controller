-- CreateTable
CREATE TABLE "photographers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "cpf" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "entry_date" DATETIME NOT NULL,
    "departure_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

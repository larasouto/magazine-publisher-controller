-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reporters" (
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
INSERT INTO "new_reporters" ("cpf", "created_at", "departure_date", "email", "entry_date", "id", "name", "phone", "specialty", "status", "updated_at") SELECT "cpf", "created_at", "departure_date", "email", "entry_date", "id", "name", "phone", "specialty", "status", "updated_at" FROM "reporters";
DROP TABLE "reporters";
ALTER TABLE "new_reporters" RENAME TO "reporters";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

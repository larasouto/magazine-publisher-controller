-- CreateTable
CREATE TABLE "magazines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "year_founded" INTEGER NOT NULL,
    "publication_period" TEXT NOT NULL,
    "theme_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "magazines_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

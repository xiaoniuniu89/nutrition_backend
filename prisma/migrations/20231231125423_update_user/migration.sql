/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT
);
INSERT INTO "new_User" ("email", "id", "username") SELECT "email", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_DiaryEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DiaryEntry" ("content", "createdAt", "id", "updatedAt", "userId") SELECT "content", "createdAt", "id", "updatedAt", "userId" FROM "DiaryEntry";
DROP TABLE "DiaryEntry";
ALTER TABLE "new_DiaryEntry" RENAME TO "DiaryEntry";
CREATE TABLE "new_WeeklySummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "weekOfYear" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeeklySummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WeeklySummary" ("createdAt", "id", "summary", "updatedAt", "userId", "weekOfYear", "year") SELECT "createdAt", "id", "summary", "updatedAt", "userId", "weekOfYear", "year" FROM "WeeklySummary";
DROP TABLE "WeeklySummary";
ALTER TABLE "new_WeeklySummary" RENAME TO "WeeklySummary";
CREATE UNIQUE INDEX "WeeklySummary_userId_key" ON "WeeklySummary"("userId");
CREATE UNIQUE INDEX "WeeklySummary_userId_weekOfYear_year_key" ON "WeeklySummary"("userId", "weekOfYear", "year");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

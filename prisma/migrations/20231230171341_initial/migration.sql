-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiaryEntryAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "diaryEntryId" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    CONSTRAINT "DiaryEntryAnalysis_diaryEntryId_fkey" FOREIGN KEY ("diaryEntryId") REFERENCES "DiaryEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeeklySummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "weekOfYear" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeeklySummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "DiaryEntryAnalysis_diaryEntryId_key" ON "DiaryEntryAnalysis"("diaryEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklySummary_userId_weekOfYear_year_key" ON "WeeklySummary"("userId", "weekOfYear", "year");

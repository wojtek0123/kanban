/*
  Warnings:

  - You are about to drop the column `numberOfColumns` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSubtasks` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfTasks` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `tagBackgroundColors` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tagFontColors` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tagNames` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "numberOfColumns",
DROP COLUMN "numberOfSubtasks",
DROP COLUMN "numberOfTasks";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tagBackgroundColors",
DROP COLUMN "tagFontColors",
DROP COLUMN "tagNames";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "taskId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

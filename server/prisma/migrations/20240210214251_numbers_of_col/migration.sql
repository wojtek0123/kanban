/*
  Warnings:

  - You are about to drop the column `columnsNumber` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `subtaskNumber` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `taskNumber` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "columnsNumber",
DROP COLUMN "subtaskNumber",
DROP COLUMN "taskNumber",
ADD COLUMN     "numberOfColumns" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfSubtasks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfTasks" INTEGER NOT NULL DEFAULT 0;

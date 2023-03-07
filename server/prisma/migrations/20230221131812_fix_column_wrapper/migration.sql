/*
  Warnings:

  - Added the required column `boardId` to the `ColumnWrapper` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_columnWrapperId_fkey";

-- AlterTable
ALTER TABLE "ColumnWrapper" ADD COLUMN     "boardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ColumnWrapper" ADD CONSTRAINT "ColumnWrapper_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

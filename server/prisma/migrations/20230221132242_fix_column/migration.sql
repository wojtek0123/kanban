/*
  Warnings:

  - You are about to drop the column `columnWrapperId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `columnId` on the `ColumnWrapper` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[columnWrapperId]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `columnWrapperId` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropForeignKey
ALTER TABLE "ColumnWrapper" DROP CONSTRAINT "ColumnWrapper_columnId_fkey";

-- DropIndex
DROP INDEX "ColumnWrapper_columnId_key";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "columnWrapperId";

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "columnWrapperId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ColumnWrapper" DROP COLUMN "columnId";

-- CreateIndex
CREATE UNIQUE INDEX "Column_columnWrapperId_key" ON "Column"("columnWrapperId");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_columnWrapperId_fkey" FOREIGN KEY ("columnWrapperId") REFERENCES "ColumnWrapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

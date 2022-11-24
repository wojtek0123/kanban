/*
  Warnings:

  - Made the column `projectId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boardId` on table `Column` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taskId` on table `Subtask` required. This step will fail if there are existing NULL values in that column.
  - Made the column `columnId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "boardId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subtask" ALTER COLUMN "taskId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "columnId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

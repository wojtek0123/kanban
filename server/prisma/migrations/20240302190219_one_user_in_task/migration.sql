/*
  Warnings:

  - You are about to drop the `UserOnTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnTask" DROP CONSTRAINT "UserOnTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnTask" DROP CONSTRAINT "UserOnTask_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "UserOnTask";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

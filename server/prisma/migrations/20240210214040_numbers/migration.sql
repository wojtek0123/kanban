-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "columnsNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subtaskNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "taskNumber" INTEGER NOT NULL DEFAULT 0;

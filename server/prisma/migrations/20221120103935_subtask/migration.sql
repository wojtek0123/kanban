-- CreateTable
CREATE TABLE "Subtask" (
    "id" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Subtask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

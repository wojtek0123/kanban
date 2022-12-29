/*
  Warnings:

  - Added the required column `dotColor` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "dotColor" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `WorkHour` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WorkHour` table. All the data in the column will be lost.
  - Added the required column `date` to the `WorkHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkHour" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

/*
  Warnings:

  - The primary key for the `WorkHour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `WorkHour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `WorkHour` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WorkHour_date_key";

-- AlterTable
ALTER TABLE "WorkHour" DROP CONSTRAINT "WorkHour_pkey",
DROP COLUMN "date",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "WorkHour_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "WorkHour_id_key" ON "WorkHour"("id");

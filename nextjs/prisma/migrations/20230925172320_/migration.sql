/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `WorkHour` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkHour_date_key" ON "WorkHour"("date");

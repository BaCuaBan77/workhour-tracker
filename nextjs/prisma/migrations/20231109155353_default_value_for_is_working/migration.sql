/*
  Warnings:

  - Made the column `isWorking` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isWorking" SET NOT NULL,
ALTER COLUMN "isWorking" SET DEFAULT false;

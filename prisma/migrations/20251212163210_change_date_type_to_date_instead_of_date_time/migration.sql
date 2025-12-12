/*
  Warnings:

  - A unique constraint covering the columns `[userId,classId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ClassInstance" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_classId_key" ON "public"."Reservation"("userId", "classId");

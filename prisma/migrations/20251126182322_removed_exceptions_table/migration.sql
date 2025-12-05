/*
  Warnings:

  - You are about to drop the `ScheduleException` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ScheduleException" DROP CONSTRAINT "ScheduleException_scheduleId_fkey";

-- DropTable
DROP TABLE "public"."ScheduleException";

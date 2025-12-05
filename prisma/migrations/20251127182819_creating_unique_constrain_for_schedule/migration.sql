/*
  Warnings:

  - A unique constraint covering the columns `[templateId,weekday,startTime]` on the table `WeeklySchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeeklySchedule_templateId_weekday_startTime_key" ON "public"."WeeklySchedule"("templateId", "weekday", "startTime");

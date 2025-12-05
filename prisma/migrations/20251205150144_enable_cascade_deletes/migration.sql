-- DropForeignKey
ALTER TABLE "MagicLink" DROP CONSTRAINT "MagicLink_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklySchedule" DROP CONSTRAINT "WeeklySchedule_templateId_fkey";

-- AddForeignKey
ALTER TABLE "MagicLink" ADD CONSTRAINT "MagicLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklySchedule" ADD CONSTRAINT "WeeklySchedule_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ClassTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

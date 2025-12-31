-- AlterTable
ALTER TABLE "public"."ClassInstance" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."UserPenalty" ALTER COLUMN "blockedUntil" SET DATA TYPE TEXT,
ALTER COLUMN "lastNoShowAt" SET DATA TYPE TEXT;

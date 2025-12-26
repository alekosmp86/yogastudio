-- CreateTable
CREATE TABLE "public"."UserPenalty" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "noShowCount" INTEGER NOT NULL DEFAULT 0,
    "blockedUntil" DATE,
    "lastNoShowAt" DATE,

    CONSTRAINT "UserPenalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPenalty_userId_key" ON "public"."UserPenalty"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserPenalty" ADD CONSTRAINT "UserPenalty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

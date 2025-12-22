-- CreateTable
CREATE TABLE "public"."WaitingList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WaitingList_classId_idx" ON "public"."WaitingList"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_userId_classId_key" ON "public"."WaitingList"("userId", "classId");

-- AddForeignKey
ALTER TABLE "public"."WaitingList" ADD CONSTRAINT "WaitingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WaitingList" ADD CONSTRAINT "WaitingList_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."ClassInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

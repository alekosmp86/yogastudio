-- CreateTable
CREATE TABLE "public"."MembershipPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maxActivities" INTEGER NOT NULL,
    "durationDays" INTEGER NOT NULL DEFAULT 30,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MembershipPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserMembership" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "membershipPlanId" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "UserMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserSelectedTemplate" (
    "id" SERIAL NOT NULL,
    "userMembershipId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "UserSelectedTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserMembership_userId_idx" ON "public"."UserMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSelectedTemplate_userMembershipId_templateId_key" ON "public"."UserSelectedTemplate"("userMembershipId", "templateId");

-- AddForeignKey
ALTER TABLE "public"."UserMembership" ADD CONSTRAINT "UserMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserMembership" ADD CONSTRAINT "UserMembership_membershipPlanId_fkey" FOREIGN KEY ("membershipPlanId") REFERENCES "public"."MembershipPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSelectedTemplate" ADD CONSTRAINT "UserSelectedTemplate_userMembershipId_fkey" FOREIGN KEY ("userMembershipId") REFERENCES "public"."UserMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSelectedTemplate" ADD CONSTRAINT "UserSelectedTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ClassTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

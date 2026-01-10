-- AlterTable
ALTER TABLE "public"."AppPreferences" ADD COLUMN     "moduleId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modules_name_key" ON "public"."Modules"("name");

-- AddForeignKey
ALTER TABLE "public"."AppPreferences" ADD CONSTRAINT "AppPreferences_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

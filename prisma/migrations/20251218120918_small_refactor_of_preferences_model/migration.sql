/*
  Warnings:

  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- DropTable
DROP TABLE "public"."Preferences";

-- CreateTable
CREATE TABLE "public"."AppPreferences" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "value" TEXT NOT NULL,

    CONSTRAINT "AppPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppPreferences_name_key" ON "public"."AppPreferences"("name");

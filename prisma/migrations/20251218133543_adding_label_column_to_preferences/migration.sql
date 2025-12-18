/*
  Warnings:

  - Added the required column `label` to the `AppPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AppPreferences" ADD COLUMN     "label" TEXT NOT NULL;

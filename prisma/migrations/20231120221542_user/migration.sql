/*
  Warnings:

  - Made the column `user_create` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_update` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_create" SET NOT NULL,
ALTER COLUMN "user_update" SET NOT NULL;

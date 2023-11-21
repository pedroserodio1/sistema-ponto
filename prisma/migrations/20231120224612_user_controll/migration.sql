/*
  Warnings:

  - You are about to drop the column `user_create` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_update` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_create",
DROP COLUMN "user_update";

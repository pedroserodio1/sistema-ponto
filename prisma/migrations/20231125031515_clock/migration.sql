/*
  Warnings:

  - The `clock_time` column on the `Clock` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Clock" DROP COLUMN "clock_time",
ADD COLUMN     "clock_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

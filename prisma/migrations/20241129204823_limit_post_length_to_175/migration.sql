/*
  Warnings:

  - You are about to alter the column `status` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(175)`.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "status" SET DATA TYPE VARCHAR(175);

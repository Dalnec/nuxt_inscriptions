/*
  Warnings:

  - You are about to drop the column `voucherId` on the `person` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_voucherId_fkey";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "voucherId";

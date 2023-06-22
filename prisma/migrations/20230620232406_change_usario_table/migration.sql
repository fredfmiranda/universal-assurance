/*
  Warnings:

  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `email`,
    ADD COLUMN `expiraEm` INTEGER NULL,
    ADD COLUMN `token` VARCHAR(191) NULL;

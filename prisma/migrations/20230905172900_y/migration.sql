/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");

-- CreateIndex
CREATE INDEX "Person_email_idx" ON "Person"("email");

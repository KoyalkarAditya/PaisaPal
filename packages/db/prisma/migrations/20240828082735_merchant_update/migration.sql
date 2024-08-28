/*
  Warnings:

  - You are about to drop the column `auth_type` on the `Merchant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneno]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneno` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type",
ADD COLUMN     "phoneno" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "AuthType";

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_phoneno_key" ON "Merchant"("phoneno");

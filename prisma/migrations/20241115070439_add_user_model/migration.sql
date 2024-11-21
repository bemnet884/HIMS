/*
  Warnings:

  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "apiKey" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SaleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PurchaseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PurchaseToSale" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExpenseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ReportToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "_SaleToUser_AB_unique" ON "_SaleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SaleToUser_B_index" ON "_SaleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseToUser_AB_unique" ON "_PurchaseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseToUser_B_index" ON "_PurchaseToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseToSale_AB_unique" ON "_PurchaseToSale"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseToSale_B_index" ON "_PurchaseToSale"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpenseToUser_AB_unique" ON "_ExpenseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpenseToUser_B_index" ON "_ExpenseToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReportToUser_AB_unique" ON "_ReportToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReportToUser_B_index" ON "_ReportToUser"("B");

-- AddForeignKey
ALTER TABLE "_SaleToUser" ADD CONSTRAINT "_SaleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SaleToUser" ADD CONSTRAINT "_SaleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToSale" ADD CONSTRAINT "_PurchaseToSale_A_fkey" FOREIGN KEY ("A") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToSale" ADD CONSTRAINT "_PurchaseToSale_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToUser" ADD CONSTRAINT "_ExpenseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToUser" ADD CONSTRAINT "_ExpenseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToUser" ADD CONSTRAINT "_ReportToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReportToUser" ADD CONSTRAINT "_ReportToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "employeeId";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "employeeId";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "employeeId";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

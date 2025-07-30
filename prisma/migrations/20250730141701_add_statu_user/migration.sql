-- CreateEnum
CREATE TYPE "StatutUser" AS ENUM ('subscribed', 'awaiting', 'verified');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "StatutUser" "StatutUser" NOT NULL DEFAULT 'awaiting';

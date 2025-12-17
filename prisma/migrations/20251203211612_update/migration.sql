/*
  Warnings:

  - You are about to drop the column `grades` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `SubjectItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectItem" DROP CONSTRAINT "SubjectItem_sectionId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "grades";

-- DropTable
DROP TABLE "SubjectItem";

-- CreateTable
CREATE TABLE "LevelLanding" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LevelLanding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeLanding" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "levelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GradeLanding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectLanding" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectLanding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LevelLanding_sectionId_key" ON "LevelLanding"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "GradeLanding_levelId_order_key" ON "GradeLanding"("levelId", "order");

-- AddForeignKey
ALTER TABLE "LevelLanding" ADD CONSTRAINT "LevelLanding_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeLanding" ADD CONSTRAINT "GradeLanding_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "LevelLanding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectLanding" ADD CONSTRAINT "SubjectLanding_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLanding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

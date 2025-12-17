/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,order]` on the table `LevelLanding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LevelLanding_sectionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "LevelLanding_sectionId_order_key" ON "LevelLanding"("sectionId", "order");

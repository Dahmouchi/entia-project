/*
  Warnings:

  - A unique constraint covering the columns `[handler]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handler]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handler]` on the table `Niveau` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handler]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `handler` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handler` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handler` to the `Niveau` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handler` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "handler" TEXT NOT NULL,
ADD COLUMN     "index" INTEGER NOT NULL,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "handler" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Niveau" ADD COLUMN     "handler" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "handler" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_handler_key" ON "Course"("handler");

-- CreateIndex
CREATE INDEX "Course_index_idx" ON "Course"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_handler_key" ON "Grade"("handler");

-- CreateIndex
CREATE UNIQUE INDEX "Niveau_handler_key" ON "Niveau"("handler");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_handler_key" ON "Subject"("handler");

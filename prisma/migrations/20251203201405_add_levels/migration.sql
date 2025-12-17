-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "grades" JSONB;

-- CreateTable
CREATE TABLE "SubjectItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectItem_sectionId_order_key" ON "SubjectItem"("sectionId", "order");

-- AddForeignKey
ALTER TABLE "SubjectItem" ADD CONSTRAINT "SubjectItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

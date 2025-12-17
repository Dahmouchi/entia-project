-- DropForeignKey
ALTER TABLE "FeatureItem" DROP CONSTRAINT "FeatureItem_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "FeatureItem" ADD CONSTRAINT "FeatureItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

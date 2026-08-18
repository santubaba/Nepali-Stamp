-- DropForeignKey
ALTER TABLE "Stamp" DROP CONSTRAINT "Stamp_categoryId_fkey";

-- AlterTable
ALTER TABLE "Stamp" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The `social_links` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "social_links",
ADD COLUMN     "social_links" JSONB[];

/*
  Warnings:

  - The primary key for the `CategoriesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `CategoriesOnPosts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_postId_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ADD CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

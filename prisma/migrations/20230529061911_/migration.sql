-- CreateIndex
CREATE INDEX "CategoriesOnPosts_postId_categoryId_idx" ON "CategoriesOnPosts"("postId", "categoryId");

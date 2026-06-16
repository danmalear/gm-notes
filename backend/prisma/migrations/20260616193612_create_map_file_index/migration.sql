/*
  Warnings:

  - A unique constraint covering the columns `[ImageFileId]` on the table `Map` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Map_ImageFileId_key" ON "Map"("ImageFileId");

/*
  Warnings:

  - A unique constraint covering the columns `[ActiveMapId]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Campaign_ActiveMapId_key" ON "Campaign"("ActiveMapId");

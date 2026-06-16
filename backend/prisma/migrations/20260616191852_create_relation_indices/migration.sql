/*
  Warnings:

  - A unique constraint covering the columns `[ImageFileId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Action_TargetId_idx" ON "Action"("TargetId");

-- CreateIndex
CREATE INDEX "Campaign_ActiveMapId_idx" ON "Campaign"("ActiveMapId");

-- CreateIndex
CREATE INDEX "Condition_CampaignId_idx" ON "Condition"("CampaignId");

-- CreateIndex
CREATE INDEX "Handout_CampaignId_idx" ON "Handout"("CampaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_ImageFileId_key" ON "Item"("ImageFileId");

-- CreateIndex
CREATE INDEX "Item_CampaignId_idx" ON "Item"("CampaignId");

-- CreateIndex
CREATE INDEX "Item_ImageFileId_idx" ON "Item"("ImageFileId");

-- CreateIndex
CREATE INDEX "LocationItem_LocationId_idx" ON "LocationItem"("LocationId");

-- CreateIndex
CREATE INDEX "LocationItem_ItemId_idx" ON "LocationItem"("ItemId");

-- CreateIndex
CREATE INDEX "Map_CampaignId_idx" ON "Map"("CampaignId");

-- CreateIndex
CREATE INDEX "Note_EntityId_idx" ON "Note"("EntityId");

-- CreateIndex
CREATE INDEX "RegionShape_RegionId_idx" ON "RegionShape"("RegionId");

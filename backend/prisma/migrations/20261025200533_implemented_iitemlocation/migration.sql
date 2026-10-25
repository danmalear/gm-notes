/*
  Warnings:

  - You are about to drop the `ILocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[RegionId]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "ILocation";

-- CreateTable
CREATE TABLE "IItemLocation" (
    "IItemLocationId" UUID NOT NULL,
    "Type" "LocationType" NOT NULL,

    CONSTRAINT "IItemLocation_pkey" PRIMARY KEY ("IItemLocationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_RegionId_key" ON "Region"("RegionId");

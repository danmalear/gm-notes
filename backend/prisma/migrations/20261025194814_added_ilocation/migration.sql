-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Region', 'Item');

-- CreateTable
CREATE TABLE "ILocation" (
    "ILocationId" UUID NOT NULL,
    "Type" "LocationType" NOT NULL,

    CONSTRAINT "ILocation_pkey" PRIMARY KEY ("ILocationId")
);

-- CreateEnum
CREATE TYPE "ActionTargetType" AS ENUM ('Item', 'LocationItem', 'Region');

-- CreateTable
CREATE TABLE "IActionTarget" (
    "IActionTargetId" UUID NOT NULL,
    "Type" "ActionTargetType" NOT NULL,

    CONSTRAINT "IActionTarget_pkey" PRIMARY KEY ("IActionTargetId")
);

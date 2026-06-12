-- CreateEnum
CREATE TYPE "HandoutType" AS ENUM ('Text', 'Image', 'File');

-- CreateTableVar
CREATE TEMP TABLE "HandoutTypes" (
  "HandoutId" uuid,
  "Type" "HandoutType"
);

-- DeleteRecs
DELETE FROM "Handout"
WHERE "Type" NOT IN ('Text', 'Image', 'File');

-- InsertRecs
INSERT INTO "HandoutTypes" (
  "HandoutId",
  "Type"
)
SELECT "HandoutId",
CAST("Type" AS "HandoutType")
FROM "Handout";

--AlterTable
ALTER TABLE "Handout"
ALTER COLUMN "Type" DROP NOT NULL;

-- UpdateTable
UPDATE "Handout"
SET "Type" = NULL;

-- AlterTable
ALTER TABLE "Handout" DROP COLUMN "Type";
ALTER TABLE "Handout" ADD COLUMN "Type" "HandoutType" NULL;

-- UpdateRecs
UPDATE "Handout" h
SET "Type" = ht."Type"
FROM "HandoutTypes" ht
WHERE ht."HandoutId" = h."HandoutId";

--AlterTable
ALTER TABLE "Handout" ALTER COLUMN "Type" SET NOT NULL;

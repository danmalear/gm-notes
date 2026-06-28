-- CreateTableVar
CREATE TEMP TABLE "MapLighting" (
  "MapId" uuid,
  "DefaultLighting" "AbsoluteLighting"
);

-- DeleteRecs
DELETE FROM "Map"
WHERE "DefaultLighting" NOT IN ('Darkness', 'Dim Light', 'Bright Light');

-- InsertRecs
INSERT INTO "MapLighting" (
  "MapId",
  "DefaultLighting"
)
SELECT "MapId",
CAST("DefaultLighting" AS "AbsoluteLighting")
FROM "Map";

--AlterTable
ALTER TABLE "Map"
ALTER COLUMN "DefaultLighting" DROP NOT NULL;

-- UpdateTable
UPDATE "Map"
SET "DefaultLighting" = NULL;

-- AlterTable
ALTER TABLE "Map" DROP COLUMN "DefaultLighting",
ADD COLUMN "DefaultLighting" "AbsoluteLighting";

-- UpdateRecs
UPDATE "Map" m
SET "DefaultLighting" = ml."DefaultLighting"
FROM "MapLighting" ml
WHERE ml."MapId" = m."MapId";

--AlterTable
ALTER TABLE "Map" ALTER COLUMN "DefaultLighting" SET NOT NULL,
ALTER COLUMN "DefaultLighting" SET DEFAULT 'Bright Light'

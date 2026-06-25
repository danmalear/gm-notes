-- CreateTableVar
CREATE TEMP TABLE "RegionLighting" (
  "RegionId" uuid,
  "Lighting" "RelativeLighting"
);

-- DeleteRecs
DELETE FROM "Region"
WHERE "Lighting" NOT IN ('Darkness', 'Dim Light', 'Bright Light', 'Default', 'Default+', 'Default-');

-- InsertRecs
INSERT INTO "RegionLighting" (
  "RegionId",
  "Lighting"
)
SELECT "RegionId",
CAST("Lighting" AS "RelativeLighting")
FROM "Region";

--AlterTable
ALTER TABLE "Region"
ALTER COLUMN "Lighting" DROP NOT NULL;

-- UpdateTable
UPDATE "Region"
SET "Lighting" = NULL;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "Lighting",
ADD COLUMN "Lighting" "RelativeLighting";

-- UpdateRecs
UPDATE "Region" r
SET "Lighting" = rl."Lighting"
FROM "RegionLighting" rl
WHERE rl."RegionId" = r."RegionId";

--AlterTable
ALTER TABLE "Region" ALTER COLUMN "Lighting" SET NOT NULL,
ALTER COLUMN "Lighting" SET DEFAULT 'Default'

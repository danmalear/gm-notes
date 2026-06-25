-- CreateTableVar
CREATE TEMP TABLE "RegionShapeTypes" (
  "RegionShapeId" uuid,
  "ShapeType" "ShapeType"
);

-- DeleteRecs
DELETE FROM "RegionShape"
WHERE "ShapeType" NOT IN ('Circle', 'Polygon', 'Rectangle');

-- InsertRecs
INSERT INTO "RegionShapeTypes" (
  "RegionShapeId",
  "ShapeType"
)
SELECT "RegionShapeId",
CAST("ShapeType" AS "ShapeType")
FROM "RegionShape";

--AlterTable
ALTER TABLE "RegionShape"
ALTER COLUMN "ShapeType" DROP NOT NULL;

-- UpdateTable
UPDATE "RegionShape"
SET "ShapeType" = NULL;

-- AlterTable
ALTER TABLE "RegionShape" DROP COLUMN "ShapeType";
ALTER TABLE "RegionShape" ADD COLUMN "ShapeType" "ShapeType";

-- UpdateRecs
UPDATE "RegionShape" rs
SET "ShapeType" = rst."ShapeType"
FROM "RegionShapeTypes" rst
WHERE rst."RegionShapeId" = rs."RegionShapeId";

--AlterTable
ALTER TABLE "RegionShape" ALTER COLUMN "ShapeType" SET NOT NULL;

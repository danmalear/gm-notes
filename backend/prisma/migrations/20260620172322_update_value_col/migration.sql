-- CreateTableVar
CREATE TEMP TABLE "ItemValueUnits" (
  "ItemId" uuid,
  "ValueUnit" "CurrencyUnit"
);

-- DeleteRecs
DELETE FROM "Item"
WHERE "ValueUnit" IS NOT NULL
AND "ValueUnit" NOT IN ('CP', 'SP', 'EP', 'GP', 'PP');

-- InsertRecs
INSERT INTO "ItemValueUnits" (
  "ItemId",
  "ValueUnit"
)
SELECT "ItemId",
CAST("ValueUnit" AS "CurrencyUnit")
FROM "Item";

-- UpdateTable
UPDATE "Item"
SET "ValueUnit" = NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "ValueUnit",
ADD COLUMN "ValueUnit" "CurrencyUnit";

-- UpdateRecs
UPDATE "Item" i
SET "ValueUnit" = ivu."ValueUnit"
FROM "ItemValueUnits" ivu
WHERE ivu."ItemId" = i."ItemId";

/*
  Warnings:

  - The `Type` column on the `Action` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('Attack', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Influence', 'Magic', 'Ready', 'Search', 'Study', 'Utilize');

-- CreateTableVar
CREATE TEMP TABLE "ActionTypes" (
  "ActionId" uuid,
  "Type" "ActionType"
);

-- DeleteRecs
DELETE FROM "Action"
WHERE "Type" IS NOT NULL
AND "Type" NOT IN ('Attack', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Influence', 'Magic', 'Ready', 'Search', 'Study', 'Utilize');

-- InsertRecs
INSERT INTO "ActionTypes" (
  "ActionId",
  "Type"
)
SELECT "ActionId",
CAST("Type" AS "ActionType")
FROM "Action";

-- UpdateTable
UPDATE "Action"
SET "Type" = NULL;

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "Type";
ALTER TABLE "Action" ADD COLUMN "Type" "ActionType";

-- UpdateRecs
UPDATE "Action" a
SET "Type" = t."Type"
FROM "ActionTypes" t
WHERE t."ActionId" = a."ActionId";

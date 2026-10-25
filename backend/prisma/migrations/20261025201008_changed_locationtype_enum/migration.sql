/*
  Warnings:

  - The values [Item] on the enum `LocationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LocationType_new" AS ENUM ('Region', 'LocationItem');
ALTER TABLE "IItemLocation" ALTER COLUMN "Type" TYPE "LocationType_new" USING ("Type"::text::"LocationType_new");
ALTER TYPE "LocationType" RENAME TO "LocationType_old";
ALTER TYPE "LocationType_new" RENAME TO "LocationType";
DROP TYPE "public"."LocationType_old";
COMMIT;

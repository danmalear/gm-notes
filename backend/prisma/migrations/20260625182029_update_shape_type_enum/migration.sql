/*
  Warnings:

  - The values [Square] on the enum `ShapeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShapeType_new" AS ENUM ('Circle', 'Polygon', 'Rectangle');
ALTER TYPE "ShapeType" RENAME TO "ShapeType_old";
ALTER TYPE "ShapeType_new" RENAME TO "ShapeType";
DROP TYPE "public"."ShapeType_old";
COMMIT;

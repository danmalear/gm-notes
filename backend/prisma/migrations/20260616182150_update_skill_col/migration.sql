-- CreateTableVar
CREATE TEMP TABLE "AbilityCheckSkills" (
  "AbilityCheckId" uuid,
  "Skill" "Skill"
);

-- DeleteRecs
DELETE FROM "AbilityCheck"
WHERE "Skill" NOT IN ('Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival');

-- InsertRecs
INSERT INTO "AbilityCheckSkills" (
  "AbilityCheckId",
  "Skill"
)
SELECT "AbilityCheckId",
CAST("Skill" AS "Skill")
FROM "AbilityCheck";

--AlterTable
ALTER TABLE "AbilityCheck"
ALTER COLUMN "Skill" DROP NOT NULL;

-- UpdateTable
UPDATE "AbilityCheck"
SET "Skill" = NULL;

-- AlterTable
ALTER TABLE "AbilityCheck" DROP COLUMN "Skill";
ALTER TABLE "AbilityCheck" ADD COLUMN "Skill" "Skill";

-- UpdateRecs
UPDATE "AbilityCheck" ac
SET "Skill" = acs."Skill"
FROM "AbilityCheckSkills" acs
WHERE acs."AbilityCheckId" = ac."AbilityCheckId";

--AlterTable
ALTER TABLE "AbilityCheck" ALTER COLUMN "Skill" SET NOT NULL;

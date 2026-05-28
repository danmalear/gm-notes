-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "es";

-- CreateTable
CREATE TABLE "es"."Command" (
    "CommandId" UUID NOT NULL,
    "StreamId" UUID,
    "CorrelationId" UUID NOT NULL,
    "Context" TEXT NOT NULL,
    "Ref" TEXT NOT NULL,
    "Data" JSONB NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("CommandId")
);

-- CreateTable
CREATE TABLE "es"."Event" (
    "EventId" UUID NOT NULL,
    "StreamId" UUID NOT NULL,
    "CorrelationId" UUID NOT NULL,
    "Context" TEXT NOT NULL,
    "Ref" TEXT NOT NULL,
    "Version" INTEGER NOT NULL,
    "Data" JSONB NOT NULL,
    "OccurredAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("EventId")
);

-- CreateTable
CREATE TABLE "es"."Stream" (
    "StreamId" UUID NOT NULL,
    "Type" TEXT NOT NULL,
    "Version" INTEGER NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("StreamId")
);

-- CreateTable
CREATE TABLE "knex_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "knex_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knex_migrations_lock" (
    "index" SERIAL NOT NULL,
    "is_locked" INTEGER,

    CONSTRAINT "knex_migrations_lock_pkey" PRIMARY KEY ("index")
);

-- CreateTable
CREATE TABLE "AbilityCheck" (
    "AbilityCheckId" UUID NOT NULL,
    "ActionId" UUID NOT NULL,
    "Skill" TEXT NOT NULL,
    "DC" INTEGER NOT NULL,
    "SuccessNarrationId" UUID,
    "FailureNarrationId" UUID,
    "CriticalSuccessNarrationId" UUID,
    "CriticalFailureNarrationId" UUID,

    CONSTRAINT "AbilityCheck_pkey" PRIMARY KEY ("AbilityCheckId")
);

-- CreateTable
CREATE TABLE "Action" (
    "ActionId" UUID NOT NULL,
    "TargetId" UUID NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" TEXT,
    "NarrationId" UUID,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("ActionId")
);

-- CreateTable
CREATE TABLE "ActionCondition" (
    "ActionId" UUID NOT NULL,
    "ConditionId" UUID NOT NULL,

    CONSTRAINT "ActionCondition_pkey" PRIMARY KEY ("ActionId","ConditionId")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "CampaignId" UUID NOT NULL,
    "CampaignTemplateId" UUID,
    "Name" TEXT NOT NULL,
    "ActiveMapId" UUID,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("CampaignId")
);

-- CreateTable
CREATE TABLE "CampaignTemplate" (
    "CampaignTemplateId" UUID NOT NULL,
    "Name" VARCHAR(63) NOT NULL,

    CONSTRAINT "CampaignTemplate_pkey" PRIMARY KEY ("CampaignTemplateId")
);

-- CreateTable
CREATE TABLE "Condition" (
    "ConditionId" UUID NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "IsMet" BOOLEAN NOT NULL DEFAULT false,
    "CampaignId" UUID NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("ConditionId")
);

-- CreateTable
CREATE TABLE "File" (
    "FileId" UUID NOT NULL,
    "FileName" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("FileId")
);

-- CreateTable
CREATE TABLE "Handout" (
    "HandoutId" UUID NOT NULL,
    "CampaignId" UUID NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Source" TEXT NOT NULL,

    CONSTRAINT "Handout_pkey" PRIMARY KEY ("HandoutId")
);

-- CreateTable
CREATE TABLE "Item" (
    "ItemId" UUID NOT NULL,
    "CampaignId" UUID,
    "Name" TEXT NOT NULL,
    "IsContainer" BOOLEAN NOT NULL DEFAULT false,
    "Value" INTEGER,
    "ValueUnit" TEXT,
    "DetailsLink" TEXT,
    "ImageFileId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("ItemId")
);

-- CreateTable
CREATE TABLE "LocationItem" (
    "LocationItemId" UUID NOT NULL,
    "LocationId" UUID NOT NULL,
    "ItemId" UUID NOT NULL,
    "Quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "LocationItem_pkey" PRIMARY KEY ("LocationItemId")
);

-- CreateTable
CREATE TABLE "Map" (
    "MapId" UUID NOT NULL,
    "CampaignId" UUID NOT NULL,
    "MapTemplateId" UUID,
    "Name" TEXT NOT NULL,
    "ImagePath" TEXT NOT NULL,
    "DefaultLighting" TEXT NOT NULL DEFAULT 'Bright Light',
    "Width" INTEGER NOT NULL DEFAULT 0,
    "Height" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("MapId")
);

-- CreateTable
CREATE TABLE "MapTemplate" (
    "MapTemplateId" UUID NOT NULL,
    "CampaignTemplateId" UUID,
    "Name" VARCHAR(63) NOT NULL,
    "ImagePath" VARCHAR(255) NOT NULL,

    CONSTRAINT "MapTemplate_pkey" PRIMARY KEY ("MapTemplateId")
);

-- CreateTable
CREATE TABLE "Narration" (
    "NarrationId" UUID NOT NULL,
    "NarrationTemplateId" UUID,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "IsRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Narration_pkey" PRIMARY KEY ("NarrationId")
);

-- CreateTable
CREATE TABLE "NarrationTemplate" (
    "NarrationTemplateId" UUID NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,

    CONSTRAINT "NarrationTemplate_pkey" PRIMARY KEY ("NarrationTemplateId")
);

-- CreateTable
CREATE TABLE "Note" (
    "NoteId" UUID NOT NULL,
    "EntityId" UUID NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("NoteId")
);

-- CreateTable
CREATE TABLE "Region" (
    "RegionId" UUID NOT NULL,
    "RegionTemplateId" UUID,
    "MapId" UUID NOT NULL,
    "Name" TEXT NOT NULL,
    "Lighting" TEXT NOT NULL DEFAULT 'Default',

    CONSTRAINT "Region_pkey" PRIMARY KEY ("RegionId")
);

-- CreateTable
CREATE TABLE "RegionHandout" (
    "RegionId" UUID NOT NULL,
    "HandoutId" UUID NOT NULL,

    CONSTRAINT "RegionHandout_pkey" PRIMARY KEY ("RegionId","HandoutId")
);

-- CreateTable
CREATE TABLE "RegionNarration" (
    "RegionId" UUID NOT NULL,
    "NarrationId" UUID NOT NULL,

    CONSTRAINT "RegionNarration_pkey" PRIMARY KEY ("RegionId","NarrationId")
);

-- CreateTable
CREATE TABLE "RegionShape" (
    "RegionShapeId" UUID NOT NULL,
    "RegionId" UUID NOT NULL,
    "ShapeType" TEXT NOT NULL,
    "Coords" JSONB NOT NULL,

    CONSTRAINT "RegionShape_pkey" PRIMARY KEY ("RegionShapeId")
);

-- CreateTable
CREATE TABLE "RegionTemplate" (
    "RegionTemplateId" UUID NOT NULL,
    "MapTemplateId" UUID NOT NULL,
    "Name" VARCHAR(63) NOT NULL,

    CONSTRAINT "RegionTemplate_pkey" PRIMARY KEY ("RegionTemplateId")
);

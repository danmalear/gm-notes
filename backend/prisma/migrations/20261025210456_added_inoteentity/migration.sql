-- CreateEnum
CREATE TYPE "NoteEntityType" AS ENUM ('Item', 'LocationItem', 'Region');

-- CreateTable
CREATE TABLE "INoteEntity" (
    "INoteEntityId" UUID NOT NULL,
    "Type" "NoteEntityType" NOT NULL,

    CONSTRAINT "INoteEntity_pkey" PRIMARY KEY ("INoteEntityId")
);

-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "public"."Flashcard" (
    "id" SERIAL NOT NULL,
    "category" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'EASY',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

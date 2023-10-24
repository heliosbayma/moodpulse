/*
  Warnings:

  - You are about to drop the `Analysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoodEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('great', 'well', 'meh', 'bad', 'horrible');

-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_journalEntryId_fkey";

-- DropForeignKey
ALTER TABLE "MoodEntry" DROP CONSTRAINT "MoodEntry_userId_fkey";

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "mood" "MoodType" NOT NULL DEFAULT 'great';

-- DropTable
DROP TABLE "Analysis";

-- DropTable
DROP TABLE "MoodEntry";

-- DropEnum
DROP TYPE "MoodTypes";

/*
  Warnings:

  - The values [meh] on the enum `MoodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MoodType_new" AS ENUM ('great', 'well', 'ok', 'bad', 'horrible');
ALTER TABLE "JournalEntry" ALTER COLUMN "mood" DROP DEFAULT;
ALTER TABLE "JournalEntry" ALTER COLUMN "mood" TYPE "MoodType_new" USING ("mood"::text::"MoodType_new");
ALTER TYPE "MoodType" RENAME TO "MoodType_old";
ALTER TYPE "MoodType_new" RENAME TO "MoodType";
DROP TYPE "MoodType_old";
ALTER TABLE "JournalEntry" ALTER COLUMN "mood" SET DEFAULT 'great';
COMMIT;

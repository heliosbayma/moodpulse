-- DropIndex
DROP INDEX "JournalEntry_userId_key";

-- CreateIndex
CREATE INDEX "JournalEntry_userId_id_idx" ON "JournalEntry"("userId", "id");

-- DropForeignKey
ALTER TABLE "NotesGlobal" DROP CONSTRAINT "NotesGlobal_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- AddForeignKey
ALTER TABLE "NotesGlobal" ADD CONSTRAINT "NotesGlobal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

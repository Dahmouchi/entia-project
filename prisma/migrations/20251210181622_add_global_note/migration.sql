-- CreateTable
CREATE TABLE "NotesGlobal" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "emoji" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NotesGlobal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotesGlobal" ADD CONSTRAINT "NotesGlobal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

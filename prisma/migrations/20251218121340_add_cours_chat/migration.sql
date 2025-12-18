-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TEACHER';

-- CreateTable
CREATE TABLE "CourseChatNotification" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseChatNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseChatMessageRead" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseChatMessageRead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseChatMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "courseId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseChatNotification_userId_isRead_idx" ON "CourseChatNotification"("userId", "isRead");

-- CreateIndex
CREATE UNIQUE INDEX "CourseChatNotification_messageId_userId_key" ON "CourseChatNotification"("messageId", "userId");

-- CreateIndex
CREATE INDEX "CourseChatMessageRead_userId_idx" ON "CourseChatMessageRead"("userId");

-- CreateIndex
CREATE INDEX "CourseChatMessageRead_messageId_readAt_idx" ON "CourseChatMessageRead"("messageId", "readAt");

-- CreateIndex
CREATE UNIQUE INDEX "CourseChatMessageRead_messageId_userId_key" ON "CourseChatMessageRead"("messageId", "userId");

-- CreateIndex
CREATE INDEX "CourseChatMessage_parentId_idx" ON "CourseChatMessage"("parentId");

-- CreateIndex
CREATE INDEX "CourseChatMessage_courseId_idx" ON "CourseChatMessage"("courseId");

-- CreateIndex
CREATE INDEX "CourseChatMessage_courseId_createdAt_idx" ON "CourseChatMessage"("courseId", "createdAt");

-- CreateIndex
CREATE INDEX "CourseChatMessage_senderId_courseId_idx" ON "CourseChatMessage"("senderId", "courseId");

-- AddForeignKey
ALTER TABLE "CourseChatNotification" ADD CONSTRAINT "CourseChatNotification_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "CourseChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatNotification" ADD CONSTRAINT "CourseChatNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatMessageRead" ADD CONSTRAINT "CourseChatMessageRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "CourseChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatMessageRead" ADD CONSTRAINT "CourseChatMessageRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatMessage" ADD CONSTRAINT "CourseChatMessage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CourseChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatMessage" ADD CONSTRAINT "CourseChatMessage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChatMessage" ADD CONSTRAINT "CourseChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

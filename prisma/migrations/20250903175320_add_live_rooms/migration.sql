-- CreateEnum
CREATE TYPE "LiveType" AS ENUM ('YOUTUBE', 'LIVEKIT', 'JITSI');

-- CreateEnum
CREATE TYPE "LiveStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'LIVE', 'ENDED');

-- CreateTable
CREATE TABLE "LiveRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LiveType" NOT NULL DEFAULT 'YOUTUBE',
    "status" "LiveStatus" NOT NULL DEFAULT 'DRAFT',
    "teacherId" TEXT NOT NULL,
    "youtubeVideoId" TEXT,
    "livekitRoom" TEXT,
    "jitsiRoom" TEXT,
    "startsAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LiveRoom" ADD CONSTRAINT "LiveRoom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

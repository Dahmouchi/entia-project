-- CreateTable
CREATE TABLE "RegisterCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "RegisterCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisterCode_code_key" ON "RegisterCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "RegisterCode_userId_key" ON "RegisterCode"("userId");

-- AddForeignKey
ALTER TABLE "RegisterCode" ADD CONSTRAINT "RegisterCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

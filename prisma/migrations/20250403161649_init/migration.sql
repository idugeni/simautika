-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pangkat" TEXT NOT NULL,
    "golongan" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "unitBagian" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nip_key" ON "User"("nip");

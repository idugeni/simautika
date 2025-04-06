-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pangkatGolongan" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "unitBagian" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktuMulai" TEXT NOT NULL,
    "waktuSelesai" TEXT NOT NULL,
    "uraianKegiatan" TEXT NOT NULL,
    "hasil" TEXT NOT NULL,
    "volumeOutput" INTEGER NOT NULL,
    "satuanOutput" TEXT NOT NULL,
    "buktiDokumen" TEXT,
    "keterangan" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SKP" (
    "id" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "periode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SKP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KinerjaUtama" (
    "id" TEXT NOT NULL,
    "uraian" TEXT NOT NULL,
    "kuantitas" INTEGER NOT NULL,
    "output" TEXT NOT NULL,
    "kualitas" INTEGER NOT NULL,
    "waktu" INTEGER NOT NULL,
    "satuanWaktu" TEXT NOT NULL,
    "biaya" DOUBLE PRECISION,
    "skpId" TEXT NOT NULL,

    CONSTRAINT "KinerjaUtama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerilakuKerja" (
    "id" TEXT NOT NULL,
    "orientasiPelayanan" INTEGER NOT NULL,
    "integritas" INTEGER NOT NULL,
    "komitmen" INTEGER NOT NULL,
    "disiplin" INTEGER NOT NULL,
    "kerjasama" INTEGER NOT NULL,
    "kepemimpinan" INTEGER NOT NULL,
    "skpId" TEXT NOT NULL,

    CONSTRAINT "PerilakuKerja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nip_key" ON "User"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "PerilakuKerja_skpId_key" ON "PerilakuKerja"("skpId");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKP" ADD CONSTRAINT "SKP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KinerjaUtama" ADD CONSTRAINT "KinerjaUtama_skpId_fkey" FOREIGN KEY ("skpId") REFERENCES "SKP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerilakuKerja" ADD CONSTRAINT "PerilakuKerja_skpId_fkey" FOREIGN KEY ("skpId") REFERENCES "SKP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

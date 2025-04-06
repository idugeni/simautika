import { z } from 'zod';

export const skpFormSchema = z.object({
  userId: z.string(),
  kegiatan: z.string().min(10, 'Uraian kegiatan minimal 10 karakter'),
  kuantitas: z.number().min(0, 'Kuantitas tidak boleh negatif'),
  kualitas: z.number().min(0, 'Kualitas tidak boleh negatif').max(100, 'Kualitas maksimal 100'),
  waktu: z.number().min(0, 'Waktu tidak boleh negatif'),
  biaya: z.number().min(0, 'Biaya tidak boleh negatif'),
  targetKuantitas: z.string().min(1, 'Target kuantitas wajib diisi'),
  targetKualitas: z.string().min(1, 'Target kualitas wajib diisi'),
  targetWaktu: z.string().min(1, 'Target waktu wajib diisi'),
  targetBiaya: z.string().min(1, 'Target biaya wajib diisi'),
  realisasiKuantitas: z.string().min(1, 'Realisasi kuantitas wajib diisi'),
  realisasiKualitas: z.string().min(1, 'Realisasi kualitas wajib diisi'),
  realisasiWaktu: z.string().min(1, 'Realisasi waktu wajib diisi'),
  realisasiBiaya: z.string().min(1, 'Realisasi biaya wajib diisi'),
});

export type SKPFormValues = z.infer<typeof skpFormSchema>;

export const skpSchema = z.object({
  tahun: z.string(),
  periode: z.enum(['Awal', 'Akhir']),
  kinerjaUtama: z.array(z.object({
    uraian: z.string(),
    kuantitas: z.number(),
    output: z.string(),
    kualitas: z.number(),
    waktu: z.number(),
    satuanWaktu: z.enum(['Hari', 'Minggu', 'Bulan']),
    biaya: z.number().optional(),
  })),
  kinerjaUtamaRealisasi: z.array(z.object({
    uraian: z.string(),
    kuantitasRealisasi: z.number(),
    kualitasRealisasi: z.number(),
    waktuRealisasi: z.number(),
    biayaRealisasi: z.number().optional(),
    nilaiCapaian: z.number(),
  })).optional(),
  perilakuKerja: z.object({
    orientasiPelayanan: z.number().min(0).max(100),
    integritas: z.number().min(0).max(100),
    komitmen: z.number().min(0).max(100),
    disiplin: z.number().min(0).max(100),
    kerjasama: z.number().min(0).max(100),
    kepemimpinan: z.number().min(0).max(100).optional(),
  }).optional(),
});

export type SKP = z.infer<typeof skpSchema>;
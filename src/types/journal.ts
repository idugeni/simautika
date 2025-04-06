import { z } from 'zod';

export const journalSchema = z.object({
  tanggal: z.string(),
  waktuMulai: z.string(),
  waktuSelesai: z.string(),
  uraianKegiatan: z.string().min(10, 'Uraian kegiatan minimal 10 karakter'),
  hasil: z.string().min(5, 'Hasil kegiatan minimal 5 karakter'),
  volumeOutput: z.number().min(0, 'Volume output tidak boleh negatif'),
  satuanOutput: z.string(),
  buktiDokumen: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'rejected']).default('draft'),
  keterangan: z.string().optional(),
});

export type Journal = z.infer<typeof journalSchema>;

export const journalFormSchema = journalSchema.omit({
  status: true,
});

export type JournalFormValues = z.infer<typeof journalFormSchema> & {
  userId?: string;
};
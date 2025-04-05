'use client';

import * as z from 'zod';
import { PANGKAT_GOLONGAN_OPTIONS, JABATAN_OPTIONS, UNIT_BAGIAN_OPTIONS, ROLE_OPTIONS } from '@/lib/constants';

export const userFormSchema = z.object({
  nip: z.string().min(1, 'NIP wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  name: z.string().min(1, 'Nama wajib diisi'),
  pangkatGolongan: z.enum(PANGKAT_GOLONGAN_OPTIONS, {
    required_error: 'Pangkat/Golongan wajib diisi',
  }),
  jabatan: z.enum(JABATAN_OPTIONS, {
    required_error: 'Jabatan wajib diisi',
  }),
  unitBagian: z.enum(UNIT_BAGIAN_OPTIONS, {
    required_error: 'Unit Bagian wajib diisi',
  }),
  role: z.enum(ROLE_OPTIONS, {
    required_error: 'Role wajib diisi',
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
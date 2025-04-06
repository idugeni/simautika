import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';

type PangkatGolongan = typeof PANGKAT_GOLONGAN_OPTIONS[number];
type Jabatan = typeof JABATAN_OPTIONS[number];
type UnitBagian = typeof UNIT_BAGIAN_OPTIONS[number];
type Role = typeof ROLE_OPTIONS[number];

export interface User {
  id: string;
  nip: string;
  password: string;
  name: string;
  pangkatGolongan: PangkatGolongan;
  jabatan: Jabatan;
  unitBagian: UnitBagian;
  role: Role;
}

export interface DataTableProps {
  data: User[];
  onDelete: (id: string) => void;
}
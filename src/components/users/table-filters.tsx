'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';

import { User } from '@/types/user';

interface TableFiltersProps {
  table: Table<User>;
}

export function TableFilters({ table }: TableFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Input
        placeholder="Filter NIP..."
        value={(table.getColumn('nip')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('nip')?.setFilterValue(event.target.value)
        }
        className="w-full sm:w-auto flex-1 min-w-[200px]"
      />
      <Input
        placeholder="Filter Nama..."
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        className="w-full sm:w-auto flex-1 min-w-[200px]"
      />
      <Select
        value={(table.getColumn('pangkatGolongan')?.getFilterValue() as string) ?? 'all'}
        onValueChange={(value) =>
          table.getColumn('pangkatGolongan')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter Pangkat/Golongan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Pangkat/Golongan</SelectItem>
          {PANGKAT_GOLONGAN_OPTIONS.map((pangkatGolongan) => (
            <SelectItem key={pangkatGolongan} value={pangkatGolongan}>
              {pangkatGolongan}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={(table.getColumn('jabatan')?.getFilterValue() as string) ?? 'all'}
        onValueChange={(value) =>
          table.getColumn('jabatan')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter Jabatan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Jabatan</SelectItem>
          {JABATAN_OPTIONS.map((jabatan) => (
            <SelectItem key={jabatan} value={jabatan}>
              {jabatan}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={(table.getColumn('unitBagian')?.getFilterValue() as string) ?? 'all'}
        onValueChange={(value) =>
          table.getColumn('unitBagian')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter Unit Bagian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Unit Bagian</SelectItem>
          {UNIT_BAGIAN_OPTIONS.map((unitBagian) => (
            <SelectItem key={unitBagian} value={unitBagian}>
              {unitBagian}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={(table.getColumn('role')?.getFilterValue() as string) ?? 'all'}
        onValueChange={(value) =>
          table.getColumn('role')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Role</SelectItem>
          {ROLE_OPTIONS.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { UserFormNew } from './UserFormNew';

export const createColumns = (onDelete: (id: string) => void): ColumnDef<User>[] => [
  {
    accessorKey: 'no',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'nip',
    header: 'NIP',
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    accessorKey: 'pangkatGolongan',
    header: 'Pangkat/Golongan',
  },
  {
    accessorKey: 'jabatan',
    header: 'Jabatan',
  },
  {
    accessorKey: 'unitBagian',
    header: 'Unit Bagian'
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const handleDelete = () => {
        try {
          if (!row.original?.id) {
            throw new Error('ID pengguna tidak valid');
          }
          onDelete(row.original.id);
        } catch (error) {
          console.error('Error saat menghapus pengguna:', error);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <UserFormNew
            mode="edit"
            user={row.original}
            onSubmit={(values) => {
              console.log('Edit user:', values);
              // Implement edit logic here
            }}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];
'use client';

import { DataTableProps, User } from '@/types/user';
import { useUsersTable } from '@/hooks/use-users-table';
import { TableFilters } from './table-filters';
import { TableContent } from './table-content';
import { TablePagination } from './table-pagination';
import { UserFormDialog } from './user-form-dialog';

export function DataTable({ data, onDelete }: DataTableProps) {
  const { table, columns } = useUsersTable(data, onDelete);

  const handleAddUser = async (values: Omit<User, 'id'>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nip: values.nip,
          name: values.name,
          pangkatGolongan: values.pangkatGolongan,
          jabatan: values.jabatan,
          unitBagian: values.unitBagian,
          role: values.role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      await response.json();
      window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Daftar User</h2>
        <UserFormDialog
          mode="add"
          onSubmit={handleAddUser}
        />
      </div>
      <TableFilters table={table} />
      <TableContent table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  );
}
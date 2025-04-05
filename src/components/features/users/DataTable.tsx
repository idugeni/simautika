'use client';

import { DataTableProps } from '@/types/user';
import { useUsersTable } from '@/hooks/use-users-table';
import { TableFilters } from './TableFilters';
import { TableContent } from './TableContent';
import { TablePagination } from './TablePagination';

export function DataTable({ data, onDelete }: DataTableProps) {
  const { table, columns } = useUsersTable(data, onDelete);

  return (
    <div className="space-y-4">
      <TableFilters table={table} />
      <TableContent table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  );
}
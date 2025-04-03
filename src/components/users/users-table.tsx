'use client';

import { TableFilters } from './table-filters';
import { TableContent } from './table-content';
import { TablePagination } from './table-pagination';
import { useUsersTable } from '@/hooks/use-users-table';
import { DataTableProps } from '@/types/user';
import { ErrorBoundary } from '@/components/error-boundary';

export function UsersTable({ data, onDelete }: DataTableProps) {
  if (!Array.isArray(data)) {
    throw new Error('Data harus berupa array');
  }

  const { table, columns } = useUsersTable(data, onDelete);

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <TableFilters table={table} />
        <TableContent table={table} columns={columns} />
        <TablePagination table={table} />
      </div>
    </ErrorBoundary>
  );
}
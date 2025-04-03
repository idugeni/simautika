'use client';

import { useState } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { User } from '@/types/user';
import { createColumns } from '@/components/users/columns';

export function useUsersTable(data: User[], onDelete: (id: string) => void) {
  if (!Array.isArray(data)) {
    throw new Error('Data harus berupa array');
  }

  if (typeof onDelete !== 'function') {
    throw new Error('onDelete harus berupa fungsi');
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = createColumns(onDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return { table, columns };
}
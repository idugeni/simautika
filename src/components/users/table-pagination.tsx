'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';

interface TablePaginationProps {
  table: Table<User>;
}

export function TablePagination({ table }: TablePaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Sebelumnya
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Selanjutnya
      </Button>
    </div>
  );
}
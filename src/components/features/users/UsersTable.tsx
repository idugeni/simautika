'use client';

import { User } from '@/types/user';
import { DataTable } from './DataTable';

interface UsersTableProps {
  data: User[];
  onDelete: (id: string) => Promise<void>;
}

export function UsersTable({ data, onDelete }: UsersTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Daftar User</h2>
      </div>
      <DataTable data={data} onDelete={onDelete} />
    </div>
  );
}
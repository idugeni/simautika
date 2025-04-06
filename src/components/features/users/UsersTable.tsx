'use client';

import { User } from '@/types/user';
import { DataTable } from './DataTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface UsersTableProps {
  data: User[];
  onDelete: (id: string) => Promise<void>;
}

export function UsersTable({ data, onDelete }: UsersTableProps) {
  if (!Array.isArray(data)) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Terjadi kesalahan saat memuat data pengguna. Silakan coba lagi nanti.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Daftar User</h2>
      </div>
      <DataTable data={data} onDelete={onDelete} />
    </div>
  );
}
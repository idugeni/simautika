'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { DeleteUserDialog } from './DeleteUserDialog';
import Link from 'next/link';

interface TableActionsProps {
  user: User;
  onDelete: (id: string) => void;
}

export function TableActions({ user, onDelete }: TableActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      if (!user?.id) {
        throw new Error('ID pengguna tidak valid');
      }
      await onDelete(user.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error saat menghapus pengguna:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/dashboard/users/${user.id}`}>
        <Button
          variant="outline"
          size="sm"
        >
          Edit
        </Button>
      </Link>
      <>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          Hapus
        </Button>
        <DeleteUserDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
        />
      </>
    </div>
  );
}
'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  mode: 'add' | 'edit';
}

export function ConfirmDialog({ open, onOpenChange, onConfirm, mode }: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === 'add' ? 'Tambah Pengguna?' : 'Simpan Perubahan?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mode === 'add'
              ? 'Apakah Anda yakin ingin menambah pengguna baru?'
              : 'Apakah Anda yakin ingin menyimpan perubahan?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {mode === 'add' ? 'Tambah' : 'Simpan'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
}

export function SuccessDialog({ open, onOpenChange, mode }: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Berhasil!</AlertDialogTitle>
          <AlertDialogDescription>
            {mode === 'add'
              ? 'Pengguna berhasil ditambahkan'
              : 'Data pengguna berhasil diperbarui'}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ErrorDialog({ open, onOpenChange }: ErrorDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Error!</AlertDialogTitle>
          <AlertDialogDescription>
            Terjadi kesalahan saat memproses data
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Tutup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
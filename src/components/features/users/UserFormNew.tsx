'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { userFormSchema, UserFormValues } from '@/types/users/schema';
import { UserFormFields } from './UserFormFields';
import { ConfirmDialog, SuccessDialog, ErrorDialog } from './UserDialogs';

interface UserFormNewProps {
  mode: 'add' | 'edit';
  user?: User;
  onSubmit: (values: UserFormValues) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export function UserFormNew({
  mode,
  user,
  onSubmit,
  trigger,
  title,
  description,
}: UserFormNewProps) {
  const [open, setOpen] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [showErrorDialog, setShowErrorDialog] = React.useState(false);
  const [formValues, setFormValues] = React.useState<UserFormValues | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user || {
      nip: '',
      password: '',
      name: '',
      pangkatGolongan: undefined,
      jabatan: undefined,
      unitBagian: undefined,
      role: undefined,
    },
  });

  const handleSubmit = async (values: UserFormValues) => {
    setFormValues(values);
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formValues) return;

    try {
      await onSubmit(formValues);
      setOpen(false);
      form.reset();
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);

      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 1500);
    } catch {
      setShowConfirmDialog(false);
      setShowErrorDialog(true);
    }
  };

  const defaultTrigger = (
    <Button variant={mode === 'add' ? 'default' : 'outline'} size="sm">
      {mode === 'add' ? 'Tambah User' : 'Edit'}
    </Button>
  );

  const defaultTitle = mode === 'add' ? 'Tambah User Baru' : 'Edit User';
  const defaultDescription =
    mode === 'add'
      ? 'Tambahkan user baru dengan mengisi form berikut'
      : 'Edit informasi user yang dipilih';

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || defaultTrigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{title || defaultTitle}</DialogTitle>
            <DialogDescription>
              {description || defaultDescription}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <UserFormFields form={form} />
              <DialogFooter className="mt-4">
                <Button type="submit">
                  {mode === 'add' ? 'Tambah' : 'Simpan'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
        mode={mode}
      />

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        mode={mode}
      />

      <ErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
      />
    </>
  );
}
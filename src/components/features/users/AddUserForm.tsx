'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { userFormSchema, UserFormValues } from '@/types/users/schema';
import { UserFormFields } from './UserFormFields';
import { toast } from 'sonner';

interface AddUserFormProps {
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export function AddUserForm({ onSubmit }: AddUserFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
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
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      form.reset();
      toast.success('User berhasil ditambahkan');
    } catch {
      toast.error('Gagal menambahkan user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Tambah User Baru</h2>
          <UserFormFields form={form} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Menambahkan...
              </>
            ) : (
              'Tambah User'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
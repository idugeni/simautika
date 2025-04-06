'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { userFormSchema, UserFormValues } from '@/types/users/schema';
import { UserFormFields } from './UserFormFields';
import { toast } from 'sonner';
import { User } from '@/types/user';

type EditUserFormValues = Omit<UserFormValues, 'password'> & { password?: string };

interface EditUserFormProps {
  user: User;
  onSubmit: (values: Partial<UserFormValues>) => Promise<void>;
}

export function EditUserForm({ user, onSubmit }: EditUserFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Modifikasi schema untuk edit form dimana password bersifat opsional
  const editFormSchema = userFormSchema.extend({
    password: userFormSchema.shape.password.optional(),
  });

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      nip: user.nip,
      password: '',
      name: user.name,
      pangkatGolongan: user.pangkatGolongan,
      jabatan: user.jabatan,
      unitBagian: user.unitBagian,
      role: user.role,
    },
  });

  const handleSubmit = async (values: EditUserFormValues) => {
    try {
      setIsSubmitting(true);
      // Jika password kosong, hapus dari values sebelum submit
      if (!values.password) {
        const { ...dataWithoutPassword } = values;
        await onSubmit(dataWithoutPassword as UserFormValues);
      } else {
        await onSubmit(values);
      }
      toast.success('User berhasil diperbarui');
    } catch {
      toast.error('Gagal memperbarui user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Edit User</h2>
          <UserFormFields form={form} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Memperbarui...
              </>
            ) : (
              'Perbarui User'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
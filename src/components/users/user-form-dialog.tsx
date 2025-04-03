'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';
import { User } from '@/types/user';

const userFormSchema = z.object({
  nip: z.string().min(1, 'NIP wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  pangkatGolongan: z.enum(PANGKAT_GOLONGAN_OPTIONS, {
    required_error: 'Pangkat/Golongan wajib diisi',
  }),
  jabatan: z.enum(JABATAN_OPTIONS, {
    required_error: 'Jabatan wajib diisi',
  }),
  unitBagian: z.enum(UNIT_BAGIAN_OPTIONS, {
    required_error: 'Unit Bagian wajib diisi',
  }),
  role: z.enum(ROLE_OPTIONS, {
    required_error: 'Role wajib diisi',
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormDialogProps {
  mode: 'add' | 'edit';
  user?: User;
  onSubmit: (values: UserFormValues) => void;
}

export function UserFormDialog({ mode, user, onSubmit }: UserFormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user || {
      nip: '',
      name: '',
      pangkatGolongan: PANGKAT_GOLONGAN_OPTIONS[0],
      jabatan: JABATAN_OPTIONS[0],
      unitBagian: UNIT_BAGIAN_OPTIONS[0],
      role: ROLE_OPTIONS[0],
    },
  });

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const result = await Swal.fire({
        title: mode === 'add' ? 'Tambah Pengguna?' : 'Simpan Perubahan?',
        text: mode === 'add' ? 'Apakah Anda yakin ingin menambah pengguna baru?' : 'Apakah Anda yakin ingin menyimpan perubahan?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: mode === 'add' ? 'Tambah' : 'Simpan',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await onSubmit(values);
        setOpen(false);
        form.reset();
        
        await Swal.fire({
          title: 'Berhasil!',
          text: mode === 'add' ? 'Pengguna berhasil ditambahkan' : 'Data pengguna berhasil diperbarui',
          icon: 'success',
          timer: 1500
        });
      }
    } catch {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat memproses data',
        icon: 'error'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === 'add' ? 'default' : 'outline'} size="sm">
          {mode === 'add' ? 'Tambah User' : 'Edit'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Tambah User Baru' : 'Edit User'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Tambahkan user baru dengan mengisi form berikut'
              : 'Edit informasi user yang dipilih'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan NIP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pangkatGolongan"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Pangkat/Golongan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Pangkat/Golongan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PANGKAT_GOLONGAN_OPTIONS.map((pangkatGolongan) => (
                        <SelectItem key={pangkatGolongan} value={pangkatGolongan}>
                          {pangkatGolongan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jabatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JABATAN_OPTIONS.map((jabatan) => (
                        <SelectItem key={jabatan} value={jabatan}>
                          {jabatan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitBagian"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unit Bagian</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih unit bagian" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {UNIT_BAGIAN_OPTIONS.map((unitBagian) => (
                        <SelectItem key={unitBagian} value={unitBagian}>
                          {unitBagian}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLE_OPTIONS.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {mode === 'add' ? 'Tambah' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const formSchema = z.object({
  nip: z.string().min(1, 'NIP harus diisi'),
  name: z.string().min(1, 'Nama harus diisi'),
  pangkatGolongan: z.string().min(1, 'Pangkat/Golongan harus dipilih'),
  jabatan: z.string().min(1, 'Jabatan harus dipilih'),
  unitBagian: z.string().min(1, 'Unit Bagian harus dipilih'),
  role: z.string().min(1, 'Role harus dipilih'),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  onSubmit: (data: FormValues) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: '',
      name: '',
      pangkatGolongan: '',
      jabatan: '',
      unitBagian: '',
      role: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <FormItem>
              <FormLabel>Pangkat/Golongan</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pangkat/golongan" />
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
              <Select onValueChange={field.onChange} value={field.value}>
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
            <FormItem>
              <FormLabel>Unit Bagian</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <Select onValueChange={field.onChange} value={field.value}>
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </form>
    </Form>
  );
}
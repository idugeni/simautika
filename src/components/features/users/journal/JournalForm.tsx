'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { journalFormSchema, JournalFormValues } from '@/types/journal';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface JournalFormProps {
  userId: string;
  onSubmit: (values: JournalFormValues) => Promise<void>;
}

export function JournalForm({ userId, onSubmit }: JournalFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      userId,
      tanggal: new Date().toISOString().split('T')[0],
      waktuMulai: '',
      waktuSelesai: '',
      uraianKegiatan: '',
      hasil: '',
      keterangan: '',
    },
  });

  const handleSubmit = async (values: JournalFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      form.reset({
        ...form.getValues(),
        waktuMulai: '',
        waktuSelesai: '',
        uraianKegiatan: '',
        hasil: '',
        keterangan: '',
      });
    } catch (error) {
      console.error('Error submitting journal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waktuMulai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Mulai</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waktuSelesai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Selesai</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="uraianKegiatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uraian Kegiatan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Deskripsi kegiatan yang dilakukan"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasil</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hasil yang dicapai"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Keterangan tambahan (opsional)"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Menyimpan...
              </>
            ) : (
              'Simpan Jurnal'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
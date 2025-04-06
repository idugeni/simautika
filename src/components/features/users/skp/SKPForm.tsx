'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { skpFormSchema, SKPFormValues } from '@/types/skp';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SKPFormProps {
  userId: string;
  onSubmit: (values: SKPFormValues) => Promise<void>;
}

export function SKPForm({ userId, onSubmit }: SKPFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SKPFormValues>({
    resolver: zodResolver(skpFormSchema),
    defaultValues: {
      userId,
      kegiatan: '',
      kuantitas: 0,
      kualitas: 0,
      waktu: 0,
      biaya: 0,
      targetKuantitas: '',
      targetKualitas: '',
      targetWaktu: '',
      targetBiaya: '',
      realisasiKuantitas: '',
      realisasiKualitas: '',
      realisasiWaktu: '',
      realisasiBiaya: '',
    },
  });

  const handleSubmit = async (values: SKPFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      form.reset();
    } catch (error) {
      console.error('Error submitting SKP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kegiatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kegiatan Tugas Jabatan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Deskripsi kegiatan tugas jabatan"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetKuantitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Kuantitas</FormLabel>
                <FormControl>
                  <Input placeholder="Target kuantitas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realisasiKuantitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realisasi Kuantitas</FormLabel>
                <FormControl>
                  <Input placeholder="Realisasi kuantitas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetKualitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Kualitas</FormLabel>
                <FormControl>
                  <Input placeholder="Target kualitas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realisasiKualitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realisasi Kualitas</FormLabel>
                <FormControl>
                  <Input placeholder="Realisasi kualitas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetWaktu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Waktu</FormLabel>
                <FormControl>
                  <Input placeholder="Target waktu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realisasiWaktu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realisasi Waktu</FormLabel>
                <FormControl>
                  <Input placeholder="Realisasi waktu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetBiaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Biaya</FormLabel>
                <FormControl>
                  <Input placeholder="Target biaya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realisasiBiaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realisasi Biaya</FormLabel>
                <FormControl>
                  <Input placeholder="Realisasi biaya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Menyimpan...
              </>
            ) : (
              'Simpan SKP'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { JournalFormValues } from '@/types/journal';

interface JournalFormFieldsProps {
  form: UseFormReturn<JournalFormValues>;
}

export function JournalFormFields({ form }: JournalFormFieldsProps) {
  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 gap-4">
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
                placeholder="Masukkan uraian kegiatan (minimal 10 karakter)"
                className="resize-none"
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
                placeholder="Masukkan hasil kegiatan (minimal 5 karakter)"
                className="resize-none"
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
          name="volumeOutput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume Output</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  placeholder="Masukkan volume output" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="satuanOutput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satuan Output</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan satuan output" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="buktiDokumen"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bukti Dokumen (Opsional)</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan link atau referensi dokumen" {...field} />
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
            <FormLabel>Keterangan (Opsional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Masukkan keterangan tambahan"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
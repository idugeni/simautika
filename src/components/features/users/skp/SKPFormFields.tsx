import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { SKP } from "@/types/skp";

interface SKPFormFieldsProps {
  form: UseFormReturn<SKP & { userId?: string }>;
}

export function SKPFormFields({ form }: SKPFormFieldsProps) {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="tahun"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tahun</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="periode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Periode</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Awal">Awal</SelectItem>
                <SelectItem value="Akhir">Akhir</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {form.watch('kinerjaUtama')?.map((_, index) => (
        <div key={index} className="space-y-4">
          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.uraian`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uraian Kegiatan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.kuantitas`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kuantitas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.output`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Output</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.kualitas`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kualitas (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.waktu`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.satuanWaktu`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan Waktu</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih satuan waktu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Hari">Hari</SelectItem>
                    <SelectItem value="Minggu">Minggu</SelectItem>
                    <SelectItem value="Bulan">Bulan</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`kinerjaUtama.${index}.biaya`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biaya (opsional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}
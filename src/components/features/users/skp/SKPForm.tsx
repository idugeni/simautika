import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SKPFormFields } from "./SKPFormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SKP, skpSchema } from "@/types/skp";
import { useState } from "react";

interface SKPFormProps {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SKPForm({ userId, onSuccess, onCancel }: SKPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SKP>({ 
    resolver: zodResolver(skpSchema),
    defaultValues: {
      tahun: new Date().getFullYear().toString(),
      periode: 'Awal',
      kinerjaUtama: [{
        uraian: '',
        kuantitas: 0,
        output: '',
        kualitas: 0,
        waktu: 0,
        satuanWaktu: 'Hari',
        biaya: 0
      }],
      perilakuKerja: {
        orientasiPelayanan: 0,
        integritas: 0,
        komitmen: 0,
        disiplin: 0,
        kerjasama: 0,
        kepemimpinan: 0,
      },
    },
  });

  const handleSubmit = async (values: SKP) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/skp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, userId }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan SKP");
      }

      toast.success("SKP berhasil disimpan");
      onSuccess?.();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan SKP");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <SKPFormFields form={form} />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
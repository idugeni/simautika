'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { journalFormSchema } from '@/types/journal';
import type { JournalFormValues } from '@/types/journal';
import { JournalFormFields } from './JournalFormFields';
import { ConfirmDialog, SuccessDialog, ErrorDialog } from './JournalDialogs';

interface JournalFormProps {
  userId: string;
  onSubmit: (values: JournalFormValues) => Promise<void>;
}

export function JournalForm({ userId, onSubmit }: JournalFormProps) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [showErrorDialog, setShowErrorDialog] = React.useState(false);
  const [formValues, setFormValues] = React.useState<JournalFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split('T')[0],
      waktuMulai: '',
      waktuSelesai: '',
      uraianKegiatan: '',
      hasil: '',
      volumeOutput: 0,
      satuanOutput: '',
      buktiDokumen: '',
      keterangan: '',
    },
  });

  const handleSubmit = async (values: JournalFormValues) => {
    setFormValues({ ...values, userId });
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formValues) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formValues);
      form.reset();
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);

      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 1500);
    } catch {
      setShowConfirmDialog(false);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <JournalFormFields form={form} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Menyimpan...
              </>
            ) : (
              'Simpan'
            )}
          </Button>
        </form>
      </Form>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
      />

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />

      <ErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
      />
    </>
  );
}
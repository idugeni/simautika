'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { User } from '@/types/user';
import { UserFormValues } from '@/types/users/schema';
import { EditUserForm } from '@/components/features/users/EditUserForm';
import { SKPForm } from '@/components/features/users/skp/SKPForm';
import { JournalForm } from '@/components/features/users/journal/JournalForm';
import { toast } from 'sonner';

export default function UserEditPage() {
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Gagal mengambil data pengguna');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (data: Partial<UserFormValues>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui data pengguna');
      }

      toast.success('Data pengguna berhasil diperbarui');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Gagal memperbarui data pengguna');
      throw error;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center mt-10 text-red-500 font-semibold">
          Data pengguna tidak ditemukan
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Edit Pengguna</h2>
        </div>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Informasi User</TabsTrigger>
            <TabsTrigger value="skp">SKP</TabsTrigger>
            <TabsTrigger value="journal">Jurnal Harian</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="p-6">
              <EditUserForm user={user} onSubmit={handleSubmit} />
            </Card>
          </TabsContent>

          <TabsContent value="skp" className="space-y-4">
            <Card className="p-6">
              <SKPForm
                userId={userId}
                onSubmit={async (values) => {
                  try {
                    const response = await fetch(`/api/users/${userId}/skp`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(values),
                    });
                    if (!response.ok) throw new Error();
                    toast.success('SKP berhasil disimpan');
                  } catch {
                    toast.error('Gagal menyimpan SKP');
                  }
                }}
              />
            </Card>
          </TabsContent>

          <TabsContent value="journal" className="space-y-4">
            <Card className="p-6">
              <JournalForm
                userId={userId}
                onSubmit={async (values) => {
                  try {
                    const response = await fetch(`/api/users/${userId}/journal`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(values),
                    });
                    if (!response.ok) throw new Error();
                    toast.success('Jurnal berhasil disimpan');
                  } catch {
                    toast.error('Gagal menyimpan jurnal');
                  }
                }}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

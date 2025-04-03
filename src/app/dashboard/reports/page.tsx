'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FiDownload, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const monthlyData = [
  { month: 'Jan', users: 65, documents: 45 },
  { month: 'Feb', users: 78, documents: 52 },
  { month: 'Mar', users: 90, documents: 60 },
  { month: 'Apr', users: 81, documents: 48 },
  { month: 'May', users: 86, documents: 55 },
  { month: 'Jun', users: 95, documents: 65 },
];

const recentReports = [
  {
    id: '1',
    title: 'Laporan Aktivitas Pengguna',
    type: 'PDF',
    date: '2024-01-15',
    size: '2.5 MB',
  },
  {
    id: '2',
    title: 'Statistik Dokumen',
    type: 'XLSX',
    date: '2024-01-10',
    size: '1.8 MB',
  },
  {
    id: '3',
    title: 'Ringkasan Kinerja Sistem',
    type: 'PDF',
    date: '2024-01-05',
    size: '3.2 MB',
  },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Laporan</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
              <FiBarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">12 laporan baru bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Unduhan</CardTitle>
              <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45/hari</div>
              <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ukuran Penyimpanan</CardTitle>
              <FiPieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 GB</div>
              <p className="text-xs text-muted-foreground">Dari total 10 GB</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Statistik Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" name="Pengguna" />
                  <Bar dataKey="documents" fill="#82ca9d" name="Dokumen" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Laporan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Ukuran</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => console.log('Download report:', report.id)}
                        >
                          <FiDownload className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
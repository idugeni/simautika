'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiTrendingUp, FiUsers, FiActivity, FiBox } from 'react-icons/fi';

const analyticsData = [
  { name: 'Jan', users: 400, sessions: 240, engagement: 67 },
  { name: 'Feb', users: 300, sessions: 139, engagement: 50 },
  { name: 'Mar', users: 200, sessions: 980, engagement: 90 },
  { name: 'Apr', users: 278, sessions: 390, engagement: 30 },
  { name: 'May', users: 189, sessions: 480, engagement: 80 },
  { name: 'Jun', users: 239, sessions: 380, engagement: 40 },
  { name: 'Jul', users: 349, sessions: 430, engagement: 65 },
];

const userActivityData = [
  { time: '00:00', active: 120 },
  { time: '04:00', active: 80 },
  { time: '08:00', active: 320 },
  { time: '12:00', active: 480 },
  { time: '16:00', active: 400 },
  { time: '20:00', active: 200 },
];

export function Analytics() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna Aktif</CardTitle>
            <FiUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,892</div>
            <p className="text-xs text-muted-foreground">+15.8% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Sesi</CardTitle>
            <FiActivity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5 menit</div>
            <p className="text-xs text-muted-foreground">+5.2% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Engagement</CardTitle>
            <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">+8.1% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
            <FiBox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+22.4% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tren Pengguna & Sesi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" name="Pengguna" />
                <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sesi" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Pengguna per Jam</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#8884d8" name="Pengguna Aktif" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
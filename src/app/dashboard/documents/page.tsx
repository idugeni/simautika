'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FiPlus, FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  lastModified: string;
}

const initialDocuments: Document[] = [
  {
    id: '1',
    title: 'Panduan Pengguna',
    type: 'PDF',
    status: 'Published',
    lastModified: '2024-01-15',
  },
  {
    id: '2',
    title: 'Laporan Tahunan 2023',
    type: 'DOCX',
    status: 'Draft',
    lastModified: '2024-01-10',
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    title: '',
    type: 'PDF',
    status: 'Draft',
  });

  const handleAddDocument = () => {
    if (newDocument.title) {
      const document: Document = {
        id: Math.random().toString(36).substr(2, 9),
        title: newDocument.title,
        type: newDocument.type || 'PDF',
        status: newDocument.status || 'Draft',
        lastModified: new Date().toISOString().split('T')[0],
      };
      setDocuments([...documents, document]);
      setIsAddDialogOpen(false);
      setNewDocument({ title: '', type: 'PDF', status: 'Draft' });
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dokumen</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FiPlus className="mr-2 h-4 w-4" />
                Tambah Dokumen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Dokumen Baru</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newDocument.status}
                    onValueChange={(value) => setNewDocument({ ...newDocument, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddDocument}>Tambah Dokumen</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diubah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell className="capitalize">{doc.status}</TableCell>
                  <TableCell>{doc.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => console.log('Download document:', doc.id)}
                    >
                      <FiDownload className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => console.log('Edit document:', doc.id)}
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
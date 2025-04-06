import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// Create user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nip, password, name, pangkatGolongan, jabatan, unitBagian, role } = body;

    // Validasi input wajib
    if (!nip || !password || !name || !pangkatGolongan || !jabatan || !unitBagian || !role) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    // Validasi nilai opsi
    if (!PANGKAT_GOLONGAN_OPTIONS.includes(pangkatGolongan)) {
      return NextResponse.json({ error: 'Pangkat/Golongan tidak valid' }, { status: 400 });
    }
    if (!JABATAN_OPTIONS.includes(jabatan)) {
      return NextResponse.json({ error: 'Jabatan tidak valid' }, { status: 400 });
    }
    if (!UNIT_BAGIAN_OPTIONS.includes(unitBagian)) {
      return NextResponse.json({ error: 'Unit/Bagian tidak valid' }, { status: 400 });
    }
    if (!ROLE_OPTIONS.includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 });
    }

    // Cek NIP sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { nip } });
    if (existingUser) {
      return NextResponse.json({ error: 'NIP sudah terdaftar' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        nip,
        password: hashedPassword,
        name,
        pangkatGolongan,
        jabatan,
        unitBagian,
        role,
      },
      select: {
        id: true,
        nip: true,
        name: true,
        pangkatGolongan: true,
        jabatan: true,
        unitBagian: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Gagal menambahkan pengguna' }, { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nip: true,
        name: true,
        pangkatGolongan: true,
        jabatan: true,
        unitBagian: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Tidak ada data pengguna ditemukan' }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Gagal mengambil data pengguna' }, { status: 500 });
  }
}

// Delete user
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

const DeleteSchema = z.object({
  id: z.string().uuid()
});

const id = searchParams.get('id');

const validation = DeleteSchema.safeParse({ id });
if (!validation.success) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

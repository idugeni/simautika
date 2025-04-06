import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // ID dari params sudah bertipe string sesuai dengan schema Prisma (UUID)
    const id = context.params.id;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json(
        { error: 'ID pengguna tidak valid' },
        { status: 400 }
      );
    }
    const body = await request.json();
    const { nip, password, name, pangkatGolongan, jabatan, unitBagian, role } = body;

    // Validasi field yang wajib
    if (!nip || !name || !pangkatGolongan || !jabatan || !unitBagian || !role) {
      return NextResponse.json(
        { error: 'Semua field harus diisi kecuali password' },
        { status: 400 }
      );
    }

    // Validasi pilihan nilai
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

    // Cek user by ID
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    // Cek apakah NIP sudah dipakai user lain
    const userWithNip = await prisma.user.findUnique({ where: { nip } });

    if (userWithNip && userWithNip.id !== id) {
      return NextResponse.json({ error: 'NIP sudah digunakan oleh pengguna lain' }, { status: 400 });
    }

    // Siapkan data untuk update
    const updateData: {
      nip: string;
      name: string;
      pangkatGolongan: string;
      jabatan: string;
      unitBagian: string;
      role: string;
      password?: string;
    } = {
      nip,
      name,
      pangkatGolongan,
      jabatan,
      unitBagian,
      role,
    };

    // Jika password diisi, hash dulu
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    const userResponse = {
      ...updatedUser,
      password: password || existingUser.password, // simpan password lama kalau tidak diganti
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui data pengguna' },
      { status: 500 }
    );
  }
}

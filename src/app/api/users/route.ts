import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PANGKAT_GOLONGAN_OPTIONS, JABATAN_OPTIONS, UNIT_BAGIAN_OPTIONS, ROLE_OPTIONS } from '@/lib/constants';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nip, name, pangkatGolongan, jabatan, unitBagian, role } = body;

    // Validasi data yang diperlukan
    if (!nip || !name || !pangkatGolongan || !jabatan || !unitBagian || !role) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Validasi nilai sesuai dengan opsi yang tersedia
    if (!PANGKAT_GOLONGAN_OPTIONS.includes(pangkatGolongan)) {
      return NextResponse.json(
        { error: 'Pangkat/Golongan tidak valid' },
        { status: 400 }
      );
    }

    if (!JABATAN_OPTIONS.includes(jabatan)) {
      return NextResponse.json(
        { error: 'Jabatan tidak valid' },
        { status: 400 }
      );
    }

    if (!UNIT_BAGIAN_OPTIONS.includes(unitBagian)) {
      return NextResponse.json(
        { error: 'Unit/Bagian tidak valid' },
        { status: 400 }
      );
    }

    if (!ROLE_OPTIONS.includes(role)) {
      return NextResponse.json(
        { error: 'Role tidak valid' },
        { status: 400 }
      );
    }

    // Cek apakah NIP sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { nip }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'NIP sudah terdaftar' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        nip,
        name,
        pangkatGolongan,
        jabatan,
        unitBagian,
        role
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan pengguna' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
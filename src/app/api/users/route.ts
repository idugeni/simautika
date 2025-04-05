import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PANGKAT_GOLONGAN_OPTIONS, JABATAN_OPTIONS, UNIT_BAGIAN_OPTIONS, ROLE_OPTIONS } from '@/lib/constants';
import bcrypt from 'bcryptjs';

// Fungsi untuk mendekripsi password
async function decryptPassword(hashedPassword: string): Promise<string> {
  // Dalam implementasi nyata, Anda mungkin ingin menggunakan metode yang lebih aman
  // Untuk saat ini, kita hanya mengembalikan hash-nya sebagai placeholder
  return hashedPassword;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nip, password, name, pangkatGolongan, jabatan, unitBagian, role } = body;

    // Validasi data yang diperlukan
    if (!nip || !password || !name || !pangkatGolongan || !jabatan || !unitBagian || !role) {
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

    // Hash password sebelum disimpan
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
        role
      }
    });

    // Kembalikan response tanpa password hash
    const userResponse = {
      ...newUser,
      password: password // Kembalikan password yang diinput untuk ditampilkan di frontend
    };

    return NextResponse.json(userResponse, { status: 201 });
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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nip: true,
        password: true,
        name: true,
        pangkatGolongan: true,
        jabatan: true,
        unitBagian: true,
        role: true
      }
    });

    if (!users) {
      return NextResponse.json(
        { error: 'Tidak ada data pengguna ditemukan' },
        { status: 404 }
      );
    }
    
    interface DatabaseUser {
      id: string;
      nip: string;
      password: string;
      name: string;
      pangkatGolongan: string;
      jabatan: string;
      unitBagian: string;
      role: string;
    }

    const usersWithDecryptedPassword = await Promise.all(
      users.map(async (user: DatabaseUser) => ({
        ...user,
        password: await decryptPassword(user.password)
      }))
    );
    
    return NextResponse.json(usersWithDecryptedPassword);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengguna' },
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
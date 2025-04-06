import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { userFormSchema } from '@/types/users/schema'; // Import the base schema
import { RouteContext } from '@/types/next';

// Schema validasi untuk ID dari params
const ParamsSchema = z.object({
  id: z.string().uuid('ID harus berupa UUID yang valid'),
});

// Schema untuk validasi body update user (semua field optional kecuali yang penting)
// Create the partial schema directly here to avoid potential build issues
const updateUserSchema = z.object({
  nip: userFormSchema.shape.nip.optional(),
  name: userFormSchema.shape.name.optional(),
  pangkatGolongan: userFormSchema.shape.pangkatGolongan.optional(),
  jabatan: userFormSchema.shape.jabatan.optional(),
  unitBagian: userFormSchema.shape.unitBagian.optional(),
  role: userFormSchema.shape.role.optional(),
  // Password is intentionally omitted for update
});

// GET /api/users/:id
export async function GET(
  request: Request,
  { params }: RouteContext<{ id: string }>
) {
  try {
    const resolvedParams = params;
    console.log('[GET] context.params:', resolvedParams);

    const parsedParams = ParamsSchema.safeParse(resolvedParams);
    if (!parsedParams.success) {
      console.error('[GET] Invalid params:', parsedParams.error);
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedParams.data.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[GET] Unexpected error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data pengguna' }, { status: 500 });
  }
}

// PUT /api/users/:id
export async function PUT(
  request: Request,
  { params }: RouteContext<{ id: string }>
) {
  try {
    const resolvedParams = params;
    console.log('[PUT] context.params:', resolvedParams);

    // Validasi params.id
    const parsedParams = ParamsSchema.safeParse(resolvedParams);
    if (!parsedParams.success) {
      console.error('[PUT] Invalid params:', parsedParams.error);
      return NextResponse.json({
        error: 'ID tidak valid',
        details: parsedParams.error.errors
      }, { status: 400 });
    }

    // Parse dan validasi body request
    const body = await request.json();
    console.log('[PUT] Request body:', body);

    const parsedBody = updateUserSchema.safeParse(body);
    if (!parsedBody.success) {
      console.error('[PUT] Invalid body:', parsedBody.error);
      return NextResponse.json({
        error: 'Data tidak valid',
        details: parsedBody.error.errors
      }, { status: 400 });
    }

    // Update user di database
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parsedParams.data.id },
        data: parsedBody.data,
      });
      return NextResponse.json(updatedUser);
    } catch (dbError) {
      // Handle kasus user tidak ditemukan
      if (dbError.code === 'P2025') {
        console.error('[PUT] User not found:', dbError);
        return NextResponse.json({
          error: 'Pengguna tidak ditemukan'
        }, { status: 404 });
      }
      throw dbError; // Re-throw untuk ditangani oleh catch block utama
    }
  } catch (error) {
    console.error('[PUT] Unexpected error:', error);
    return NextResponse.json({
      error: 'Terjadi kesalahan internal server'
    }, { status: 500 });
  }
}

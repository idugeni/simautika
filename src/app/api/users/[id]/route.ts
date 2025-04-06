import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Schema validasi untuk ID dari params
const ParamsSchema = z.object({
  id: z.string().uuid(),
});

// GET /api/users/:id
export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const resolvedParams = await context.params;
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
export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const resolvedParams = await context.params;
    console.log('[PUT] context.params:', resolvedParams);

    const parsedParams = ParamsSchema.safeParse(resolvedParams);
    if (!parsedParams.success) {
      console.error('[PUT] Invalid params:', parsedParams.error);
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    console.log('[PUT] Request body:', body);

    const updatedUser = await prisma.user.update({
      where: { id: parsedParams.data.id },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[PUT] Unexpected error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memperbarui data pengguna' }, { status: 500 });
  }
}

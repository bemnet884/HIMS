// /app/api/sales/route.ts
import { NextResponse } from 'next/server';
import prisma  from '@/lib/db';

export async function POST(request: Request) {
  const data = await request.json();

  const sale = await prisma.sale.create({
    data: {
      userId: parseInt(data.userId),
      productId: parseInt(data.productId),
      quantity: parseInt(data.quantity),
      total: parseFloat(data.total),
    },
  });

  return NextResponse.json(sale);
}

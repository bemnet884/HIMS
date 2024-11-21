// src/app/api/alerts/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch low-stock products
    const lowStockProducts = await prisma.product.findMany({
      where: { stockQuantity: { lt: 10 } },
      select: { name: true, stockQuantity: true },
    });

    // Fetch recent significant sales surges (e.g., sales increase of 50+ units)
    const salesSurges = await prisma.sale.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    // Filter for sales with a surge (quantity threshold)
    const significantSurges = salesSurges.filter((surge) => (surge._sum?.quantity ?? 0) > 50);

    // Retrieve product names for surge products
    const surgeProductIds = significantSurges.map((surge) => surge.productId);
    const surgeProducts = await prisma.product.findMany({
      where: { id: { in: surgeProductIds } },
      select: { id: true, name: true },
    });

    // Map surges with product names
    const salesSurgeAlerts = significantSurges.map((surge) => {
      const product = surgeProducts.find((prod) => prod.id === surge.productId);
      return {
        productName: product?.name,
        surgeAmount: surge._sum?.quantity ?? 0,
      };
    });

    return NextResponse.json({
      lowStockAlerts: lowStockProducts,
      salesSurgeAlerts,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

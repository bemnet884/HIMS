// src/app/api/salesinsights/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const salesTrend = await prisma.sale.groupBy({
      by: ['saleDate'],
      _sum: { total: true },
      orderBy: { saleDate: 'asc' },
    });

    const topSellingProducts = await prisma.sale.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const salesTrendFormatted = salesTrend.map(item => ({
      date: item.saleDate.toISOString().split('T')[0],
      sales: item._sum.total || 0,
    }));

    const topSellingProductsFormatted = await Promise.all(
      topSellingProducts.map(async item => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          productName: product?.name || 'Unknown',
          quantitySold: item._sum.quantity || 0,
        };
      })
    );

    return NextResponse.json({
      salesTrend: salesTrendFormatted,
      topSellingProducts: topSellingProductsFormatted,
    });
  } catch (error) {
    console.error('Error fetching sales insights:', error);
    return NextResponse.json({ error: 'Failed to fetch sales insights' }, { status: 500 });
  }
}

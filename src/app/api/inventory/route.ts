// src/app/api/inventory/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forecasting data - sales trends, future projections (sample logic for forecast)
    const salesData = await prisma.sale.findMany({
      select: {
        saleDate: true,
        quantity: true,
      },
      orderBy: { saleDate: 'asc' },
    });

    // Inventory turnover rate (ratio of sales to stock)
    const inventoryTurnover = await prisma.sale.aggregate({
      _sum: { quantity: true },
    });

    const totalInventory = await prisma.product.aggregate({
      _sum: { stockQuantity: true },
    });

    // Low-stock products
    const lowStockProducts = await prisma.product.findMany({
      where: { stockQuantity: { lt: 10 } },
      select: { name: true, stockQuantity: true },
    });

    return NextResponse.json({
      salesData,
      inventoryTurnoverRate:
        (inventoryTurnover._sum.quantity || 0) / (totalInventory._sum.stockQuantity || 1),
      lowStockProducts,
    });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    return NextResponse.json({ error: "Failed to fetch inventory data" }, { status: 500 });
  }
}

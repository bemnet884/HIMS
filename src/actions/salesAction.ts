'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function getCurrentUserId(): Promise<number> {
  const userId = true; // Replace with your auth logic
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return Number(userId);
}
export async function getSaleById(id: number) {
  return await prisma.sale.findUnique({
    where: { id },
    include: { product: true },
  });
}
export async function createSale(data: { productId: number; quantity: number }) {
  const userId = await getCurrentUserId();
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) throw new Error(`Product with ID ${data.productId} does not exist`);
  if (product.stockQuantity < data.quantity) throw new Error(`Insufficient stock for product ID ${data.productId}`);

  const total = product.price * data.quantity;

  const sale = await prisma.sale.create({
    data: {
      userId,
      productId: data.productId,
      quantity: data.quantity,
      total,
    },
  });

  await prisma.product.update({
    where: { id: data.productId },
    data: { stockQuantity: product.stockQuantity - data.quantity },
  });

  revalidatePath('/sales');
  return sale;
}

export async function getSales() {
  return await prisma.sale.findMany({ include: { product: true } });
}

export async function getMonthlySalesData() {
  const salesData = await prisma.sale.groupBy({
    by: ["saleDate"],
    _sum: { total: true },
    orderBy: { saleDate: "asc" },
  });

  const monthlyData = salesData.reduce((acc, sale) => {
    const month = new Date(sale.saleDate).toLocaleString("default", { month: "long" });
    const existing = acc.find((item) => item.month === month);
    if (existing) existing.total += sale._sum.total || 0;
    else acc.push({ month, total: sale._sum.total || 0 });
    return acc;
  }, [] as { month: string; total: number }[]);

  return monthlyData;
}

export async function updateSale(id: number, data: {
  productId?: number; quantity?: number; total?: number;
}) {
  await prisma.sale.update({
    where: { id },
    data,
  });
  revalidatePath(`/sales/${id}`);
}

export async function deleteSale(id: number) {
  await prisma.sale.delete({
    where: { id },
  });
  revalidatePath('/sales'); // Revalidate the sales list page
}

'use server'

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createSale(data: { productId: number; quantity: number; employeeId: number }) {
  // Find the product to get its price and current stock
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    throw new Error(`Product with ID ${data.productId} does not exist`);
  }

  // Check if there is enough stock to complete the sale
  if (product.stockQuantity < data.quantity) {
    throw new Error(`Insufficient stock for product with ID ${data.productId}`);
  }

  // Calculate the total based on quantity and product price
  const total = product.price * data.quantity;

  // Create the sale with the calculated total
  const sale = await prisma.sale.create({
    data: {
      productId: data.productId,
      quantity: data.quantity,
      total,
      employeeId: data.employeeId,
    },
  });

  // Update the product's stock quantity by decreasing it by the sale quantity
  await prisma.product.update({
    where: { id: data.productId },
    data: {
      stockQuantity: product.stockQuantity - data.quantity,
    },
  });

  revalidatePath('/sales'); // Revalidate the sales list page
  return sale;
}

export async function getSales() {
  return await prisma.sale.findMany({
    include: { product: true, employee: true },
  });
}

export async function getSaleById(id: number) {
  return await prisma.sale.findUnique({
    where: { id },
    include: { product: true, employee: true },
  });
}

export async function getMonthlySalesData() {
  const salesData = await prisma.sale.groupBy({
    by: ["saleDate"],
    _sum: {
      total: true,
    },
    orderBy: {
      saleDate: "asc",
    },
  });

  // Format the data by grouping sales into months
  const monthlyData = salesData.reduce((acc, sale) => {
    const month = new Date(sale.saleDate).toLocaleString("default", { month: "long" });
    const existingMonth = acc.find((item) => item.month === month);

    if (existingMonth) {
      existingMonth.total += sale._sum.total || 0;
    } else {
      acc.push({ month, total: sale._sum.total || 0 });
    }

    return acc;
  }, [] as { month: string; total: number }[]);

  return monthlyData;
}
export async function updateSale(id: number, data: {
  productId?: number; quantity?: number;  total?: number; employeeId?: number;
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

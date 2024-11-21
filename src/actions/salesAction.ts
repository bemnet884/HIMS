'use server'

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
async function getCurrentUserId(): Promise<number> {
  const { userId } = await auth(); // Ensure `auth()` provides user information
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return Number(userId); // Convert to number if needed
}

export async function createSale(data: { productId: number; quantity: number }) {
  // Find the product to get its price and current stock
   const userId = await getCurrentUserId(); 
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
     userId: Number(userId),
      productId: data.productId,
      quantity: data.quantity,
      total,
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
    include: { product: true },
  });
}

export async function getSaleById(id: number) {
  return await prisma.sale.findUnique({
    where: { id },
    include: { product: true },
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

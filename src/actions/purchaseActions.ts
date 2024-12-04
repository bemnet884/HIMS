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

export async function createPurchase(data: { productId: number; quantity: number; total: number; supplier: string }) {
  const userId = await getCurrentUserId();
  
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) throw new Error(`Product with ID ${data.productId} does not exist`);

  const purchase = await prisma.purchase.create({
    data: {
      userId,
      productId: data.productId,
      quantity: data.quantity,
      total: data.total,
      supplier: data.supplier,
    },
  });

  await prisma.product.update({
    where: { id: data.productId },
    data: { stockQuantity: product.stockQuantity + data.quantity },
  });

  revalidatePath('/purchases');
  return purchase;
}

export async function getPurchases() {
  return await prisma.purchase.findMany({
    include: { product: true },
  });
}

export async function getPurchaseById(id: number) {
  return await prisma.purchase.findUnique({
    where: { id },
    include: { product: true },
  });
}

export async function updatePurchase(id: number, data: { quantity?: number; total?: number, supplier?: string }) {
  const purchase = await prisma.purchase.update({
    where: { id },
    data,
  });
  revalidatePath(`/purchases/${id}`);
  return purchase;
}

export async function deletePurchase(id: number) {
  await prisma.purchase.delete({
    where: { id },
  });
  revalidatePath('/purchases');
}

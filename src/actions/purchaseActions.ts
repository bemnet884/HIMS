'use server';

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


export async function createPurchase(data: { productId: number; quantity: number; total: number; supplier: string }) {
     const userId = await getCurrentUserId(); 
  const purchase = await prisma.purchase.create({
     data: {
      userId: Number(userId),
      quantity: data.quantity,
      total: data.total,
      supplier: data.supplier,
      productId: data.productId
  } });
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

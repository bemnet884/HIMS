// /app/actions/purchaseActions.ts
'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPurchase(data: { productId: number; quantity: number; total: number; supplier: string; employeeId: number }) {
  const purchase = await prisma.purchase.create({ data });
  revalidatePath('/purchases');
  return purchase;
}

export async function getPurchases() {
  return await prisma.purchase.findMany({ include: { product: true, employee: true } });
}

export async function getPurchaseById(id: number) {
  return await prisma.purchase.findUnique({ where: { id }, include: { product: true, employee: true } });
}

export async function updatePurchase(id: number, data: { quantity?: number; total?: number, supplier?: string }) {
  const purchase = await prisma.purchase.update({ where: { id }, data });
  revalidatePath(`/purchases/${id}`);
  return purchase;
}

export async function deletePurchase(id: number) {
  await prisma.purchase.delete({ where: { id } });
  revalidatePath('/purchases');
}

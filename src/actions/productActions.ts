'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: { name: string; description?: string; price: number; stockQuantity: number }) {
  const product = await prisma.product.create({
    data,
  });
  revalidatePath('/products');
  return product;
}

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function updateProduct(id: number, data: { name?: string; price?: number; stockQuantity?: number; description?: string }) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  revalidatePath(`/products/${id}`); // Revalidate the path to reflect updates
  return product;
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath('/products');
}

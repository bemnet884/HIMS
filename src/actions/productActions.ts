'use server'

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
async function getCurrentUserId(): Promise<number> {
  const userId  = true; // Ensure `auth()` provides user information
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return Number(userId); // Convert to number if needed
}

export async function createProduct(data: { name: string; description: string; price: number; stockQuantity: number }) {
  const userId  = true;
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

// actions/productActions.ts

export async function getTopSoldProducts(limit = 5) {
  // Aggregate sales data to get total quantity sold per product
  const topSoldProducts = await prisma.sale.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: limit,
  });

  // Get product details for each product ID in topSoldProducts
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: topSoldProducts.map((sale) => sale.productId),
      },
    },
    include: {
      sales: true,
    },
  });

  // Add total quantity sold to each product object
  return products.map((product) => {
    const totalQuantitySold = topSoldProducts.find((sale) => sale.productId === product.id)?._sum.quantity || 0;
    return { ...product, totalQuantitySold };
  });
}

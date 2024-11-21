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


export async function createExpense(data: { description: string; amount: number }) {
  const userId = await getCurrentUserId(); // Await the async function
  const expense = await prisma.expense.create({
    data: {
      ...data,
      userId: Number(userId), // Ensure userId is converted to the correct type
    },
  });
  revalidatePath('/expenses');
  return expense;
}


export async function getExpenses() {
  return await prisma.expense.findMany();
}

export async function getExpenseById(id: number) {
  return await prisma.expense.findUnique({
    where: { id },
  });
}

export async function updateExpense(id: number, data: { amount?: number, description?: string }) {
  const expense = await prisma.expense.update({
    where: { id },
    data,
  });
  revalidatePath(`/expenses/${id}`);
  return expense;
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({
    where: { id },
  });
  revalidatePath('/expenses');
}

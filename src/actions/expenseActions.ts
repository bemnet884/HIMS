// /app/actions/expenseActions.ts
'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createExpense(data: { description: string; amount: number; employeeId: number }) {
  const expense = await prisma.expense.create({ data });
  revalidatePath('/expenses');
  return expense;
}

export async function getExpenses() {
  return await prisma.expense.findMany({ include: { employee: true } });
}

export async function getExpenseById(id: number) {
  return await prisma.expense.findUnique({ where: { id }, include: { employee: true } });
}

export async function updateExpense(id: number, data: { amount?: number, description?: string}) {
  const expense = await prisma.expense.update({ where: { id }, data });
  revalidatePath(`/expenses/${id}`);
  return expense;
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({ where: { id } });
  revalidatePath('/expenses');
}

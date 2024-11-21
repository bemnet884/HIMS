// src/app/api/financial/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch total expenses, categorized by expense type
    const expenses = await prisma.expense.groupBy({
      by: ['description'],
      _sum: { amount: true },
    });

    // Fetch total revenue and calculate profit margin
    const totalSales = await prisma.sale.aggregate({ _sum: { total: true } });
    const totalPurchases = await prisma.purchase.aggregate({ _sum: { total: true } });
    const totalExpenses = await prisma.expense.aggregate({ _sum: { amount: true } });

    const totalRevenue = totalSales._sum.total || 0;
    const totalCOGS = totalPurchases._sum.total || 0;
    const grossProfit = totalRevenue - totalCOGS;
    const netProfit = grossProfit - (totalExpenses._sum.amount || 0);
    const profitMargin = totalRevenue ? (netProfit / totalRevenue) * 100 : 0;

    // Calculate ROI (sample calculation using gross profit and total expenses)
    const roi = totalExpenses._sum.amount
      ? (grossProfit / totalExpenses._sum.amount) * 100
      : 0;

    return NextResponse.json({
      expenses,
      profitMargin,
      roi,
    });
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json({ error: 'Failed to fetch financial data' }, { status: 500 });
  }
}

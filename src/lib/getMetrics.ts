import prisma from '@/lib/db';

export type Metrics = {
  totalRevenue: number;
  totalExpenses: number;
  totalCOGS: number;
  grossProfit: number;
  netProfit: number;
  totalProductsSold: number;
  revenueChange: number; // Percentage change, e.g., 5 for +5%
  profitMargin: number; // Profit margin percentage, e.g., 20 for 20%
  salesTrend: 'up' | 'down' | 'neutral'; // Simple trend indicator
};

export async function getMetrics(): Promise<Metrics> {
  try {
    // Basic calculations for revenue, expenses, COGS, etc.
    const totalSalesResult = await prisma.sale.aggregate({ _sum: { total: true } });
    const totalRevenue = totalSalesResult._sum.total ?? 0;

    const totalExpensesResult = await prisma.expense.aggregate({ _sum: { amount: true } });
    const totalExpenses = totalExpensesResult._sum.amount ?? 0;

    const totalPurchasesResult = await prisma.purchase.aggregate({ _sum: { total: true } });
    const totalCOGS = totalPurchasesResult._sum.total ?? 0;

    const grossProfit = totalRevenue - totalCOGS;
    const netProfit = grossProfit - totalExpenses;

    const totalProductsSoldResult = await prisma.sale.aggregate({ _sum: { quantity: true } });
    const totalProductsSold = totalProductsSoldResult._sum.quantity ?? 0;

    // Mock values for additional metrics
    const revenueChange = 5; // Example percentage change (mocked)
    const profitMargin = (netProfit / totalRevenue) * 100 || 0; // Calculate profit margin as a percentage
    const salesTrend = totalProductsSold > 100 ? 'up' : totalProductsSold < 50 ? 'down' : 'neutral'; // Mocked sales trend

    return {
      totalRevenue,
      totalExpenses,
      totalCOGS,
      grossProfit,
      netProfit,
      totalProductsSold,
      revenueChange,
      profitMargin,
      salesTrend,
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw new Error("Failed to fetch metrics");
  }
}

// src/lib/getMetrics.ts (server-side only)
import prisma from '@/lib/db';

export type Metrics = {
  totalInventoryValue: number;
  totalRevenue: number;
  netProfit: number;
  grossProfit: number;
  totalProductsSold: number;
  revenueChange: number;
  profitMargin: number;
  salesTrend: 'up' | 'down' | 'neutral';
};

export async function getMetrics(): Promise<Metrics> {
  const [totalSales, totalExpenses, totalPurchases, totalProductsSold] = await Promise.all([
    prisma.sale.aggregate({ _sum: { total: true } }).then(res => res._sum.total || 0),
    prisma.expense.aggregate({ _sum: { amount: true } }).then(res => res._sum.amount || 0),
    prisma.purchase.aggregate({ _sum: { total: true } }).then(res => res._sum.total || 0),
    prisma.sale.aggregate({ _sum: { quantity: true } }).then(res => res._sum.quantity || 0),
  ]);

  const totalRevenue = totalSales;
  const totalExpensesAmount = totalExpenses;
  const totalCOGS = totalPurchases;
  const grossProfit = totalRevenue - totalCOGS;
  const netProfit = grossProfit - totalExpensesAmount;
  const profitMargin = (netProfit / totalRevenue) * 100 || 0;
  const salesTrend = totalProductsSold > 100 ? 'up' : totalProductsSold < 50 ? 'down' : 'neutral';

  return {
    totalInventoryValue: totalRevenue,
    totalRevenue,
    netProfit,
    grossProfit,
    totalProductsSold,
    revenueChange: 5, // Example value, replace with actual calculation if needed
    profitMargin,
    salesTrend,
  };
}

export async function getInventoryMonitoring() {
  const lowStockProducts = await prisma.product.findMany({
    where: { stockQuantity: { lt: 10 } },
    select: { name: true, stockQuantity: true },
  });

  return { lowStockProducts };
}

export async function getSalesInsights() {
  const [recentSales, topSellingProducts] = await Promise.all([
    prisma.sale.findMany({ take: 5, orderBy: { saleDate: 'desc' } }),
    prisma.sale.groupBy({
      by: ['productId'],
      _sum: { total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: 5,
    }),
  ]);

  return { recentSales, topSellingProducts };
}

export async function getDashboardData() {
  const [metrics, inventoryMonitoring, salesInsights] = await Promise.all([
    getMetrics(),
    getInventoryMonitoring(),
    getSalesInsights(),
  ]);

  return {
    metrics,
    inventoryMonitoring,
    salesInsights,
  };
}
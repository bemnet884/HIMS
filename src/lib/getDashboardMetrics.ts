// src/lib/getDashboardMetrics.ts
import prisma from '@/lib/db';

export type DashboardMetrics = {
  totalInventoryValue: number;
  totalRevenue: number;
  netProfit: number;
  stockLevels: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  // Aggregate total sales revenue and total expenses
  const [totalSales, totalExpenses, products] = await Promise.all([
    prisma.sale.aggregate({ _sum: { total: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.product.findMany({ select: { stockQuantity: true, price: true } }),
  ]);

  const totalRevenue = totalSales._sum.total || 0;
  const totalExpensesAmount = totalExpenses._sum.amount || 0;
  const netProfit = totalRevenue - totalExpensesAmount;

  // Calculate total inventory value
  const totalInventoryValue = products.reduce((acc, product) => {
    return acc + product.stockQuantity * product.price;
  }, 0);

  // Calculate stock levels
  const stockLevels = products.reduce(
    (levels, product) => {
      if (product.stockQuantity === 0) {
        levels.outOfStock++;
      } else if (product.stockQuantity < 10) {
        levels.lowStock++;
      } else {
        levels.inStock++;
      }
      return levels;
    },
    { inStock: 0, lowStock: 0, outOfStock: 0 }
  );

  return {
    totalInventoryValue,
    totalRevenue,
    netProfit,
    stockLevels,
  };
}

// src/app/dashboard/FinancialInsights.tsx
'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import '@/lib/chart-setup';
interface FinancialData {
  expenses: { description: string; _sum: { amount: number } }[];
  profitMargin: number;
  roi: number;
}

export default function FinancialInsights() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch('/api/financial');
        if (!response.ok) throw new Error('Failed to fetch financial data');
        const data = await response.json();
        setFinancialData(data);
      } catch (err) {
        console.error('Error fetching financial data:', err);
        setError('Failed to load financial data');
      }
    };

    fetchFinancialData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!financialData) return <div>Loading...</div>;

  const expenseData = financialData.expenses.map((expense) => ({
    label: expense.description,
    amount: expense._sum.amount,
  }));

  const barChartData = {
    labels: expenseData.map((exp) => exp.label),
    datasets: [
      {
        label: 'Expenses',
        data: expenseData.map((exp) => exp.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Profit Margin', 'Remaining Costs'],
    datasets: [
      {
        data: [financialData.profitMargin, 100 - financialData.profitMargin],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Financial Insights</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="profit-margin">Profit Margin</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Expense Type</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHeader>
            {expenseData.map((expense) => (
              <TableRow key={expense.label}>
                <TableCell>{expense.label}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TabsContent>

        <TabsContent value="profit-margin">
          <div className="h-64">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </TabsContent>

        <TabsContent value="roi">
          <div className="h-64">
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
          <div className="text-center mt-4">
            <p>ROI: {financialData.roi.toFixed(2)}%</p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

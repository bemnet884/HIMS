'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN UI components

type Metrics = {
  totalInventoryValue: number;
  stockLevels: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  totalRevenue: number;
  netProfit: number;
};

export default function KeyMetricsOverview() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: Metrics = await response.json();
        setMetrics(data);
      } catch (err) {
        setError('Failed to load metrics.');
        console.error('Error fetching metrics:', err);
      }
    };
    fetchMetrics();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!metrics) return <div>Loading...</div>;

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Key Metrics Overview Cards */}
      <Card>
        <CardHeader>Total Inventory Value</CardHeader>
        <CardContent className="text-lg font-bold">{metrics.totalInventoryValue.toLocaleString()}</CardContent>
      </Card>
      <Card>
        <CardHeader>Stock Levels</CardHeader>
        <CardContent>
          In Stock: {metrics.stockLevels.inStock} | Low: {metrics.stockLevels.lowStock} | Out: {metrics.stockLevels.outOfStock}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Total Revenue</CardHeader>
        <CardContent className="text-lg font-bold">${metrics.totalRevenue.toLocaleString()}</CardContent>
      </Card>
      <Card>
        <CardHeader>Net Profit</CardHeader>
        <CardContent className="text-lg font-bold">${metrics.netProfit.toLocaleString()}</CardContent>
      </Card>
    </section>
  );
}

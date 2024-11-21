// src/app/dashboard/InventoryMonitoring.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface InventoryData {
  salesData: { saleDate: string; quantity: number }[];
  inventoryTurnoverRate: number;
  lowStockProducts: { name: string; stockQuantity: number }[];
}

export default function InventoryMonitoring() {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInventoryData(data);
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError('Failed to load inventory data');
      }
    };

    fetchInventoryData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!inventoryData) return <div>Loading...</div>;

  const lineChartData = {
    labels: inventoryData.salesData.map(item => new Date(item.saleDate).toLocaleDateString()),
    datasets: [
      {
        label: 'Sales Quantity Over Time',
        data: inventoryData.salesData.map(item => item.quantity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Inventory Monitoring</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Stock Forecasting Chart */}
        <Card>
          <CardHeader>Stock Forecasting</CardHeader>
          <CardContent>
            <Line data={lineChartData} options={{ responsive: true }} />
          </CardContent>
        </Card>

        {/* Inventory Turnover */}
        <Card>
          <CardHeader>Inventory Turnover</CardHeader>
          <CardContent>{(inventoryData.inventoryTurnoverRate * 100).toFixed(2)}% This Month</CardContent>
        </Card>

        {/* Low-Stock Alerts */}
        <Card>
          <CardHeader>Low-Stock Alerts</CardHeader>
          <CardContent>
            {inventoryData.lowStockProducts.length > 0
              ? `${inventoryData.lowStockProducts.length} Items Need Restocking`
              : 'All items are sufficiently stocked.'}
            <ul>
              {inventoryData.lowStockProducts.map((product) => (
                <li key={product.name}>{product.name}: {product.stockQuantity} left</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

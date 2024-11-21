// src/app/dashboard/SalesInsights.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  salesTrend: { date: string; sales: number }[];
  topSellingProducts: { productName: string; quantitySold: number }[];
}

export default function SalesInsights() {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('/api/salesinsights');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales data');
      }
    };

    fetchSalesData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!salesData) return <div>Loading...</div>;

  const lineChartData = {
    labels: salesData.salesTrend.map(item => item.date),
    datasets: [
      {
        label: 'Sales Over Time',
        data: salesData.salesTrend.map(item => item.sales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: salesData.topSellingProducts.map(item => item.productName),
    datasets: [
      {
        label: 'Quantity Sold',
        data: salesData.topSellingProducts.map(item => item.quantitySold),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Sales Insights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>List of top selling Products</CardHeader>
          <CardContent>
            <ul>
              {salesData.topSellingProducts.map((item, index) =>
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{item.productName}</span>
                  <span>{item.quantitySold} units sold</span>
                </li>
              )}

            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Sales Trends</CardHeader>
          <CardContent>
            <Line data={lineChartData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Top-Selling Products</CardHeader>
          <CardContent>
            <Bar data={barChartData} options={{ responsive: true }} />
          </CardContent>
        </Card>


      </div>
    </section>
  );
}

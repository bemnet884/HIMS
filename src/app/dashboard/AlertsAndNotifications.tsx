// src/app/dashboard/AlertsAndNotifications.tsx
'use client';

import { useEffect, useState } from 'react';

interface LowStockAlert {
  name: string;
  stockQuantity: number;
}

interface SalesSurgeAlert {
  productName: string;
  surgeAmount: number;
}

interface AlertsData {
  lowStockAlerts: LowStockAlert[];
  salesSurgeAlerts: SalesSurgeAlert[];
}

export default function AlertsAndNotifications() {
  const [alerts, setAlerts] = useState<AlertsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        if (!response.ok) throw new Error('Failed to fetch alerts');
        const data: AlertsData = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Failed to load alerts');
      }
    };

    fetchAlerts();
  }, []);

  if (error) return <div>{error}</div>;
  if (!alerts) return <div>Loading...</div>;

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
      <div className="flex flex-col gap-4">
        {/* Low Stock Alerts */}
        {alerts.lowStockAlerts?.length > 0 ? (
          alerts.lowStockAlerts.map((alert) => (
            <div key={alert.name} className="p-4 bg-red-100 text-red-700 rounded-lg">
              Low Stock Alert: {alert.name} needs restocking! (Remaining: {alert.stockQuantity})
            </div>
          ))
        ) : (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">No low stock alerts</div>
        )}

        {/* Sales Surge Alerts */}
        {alerts.salesSurgeAlerts?.length > 0 ? (
          alerts.salesSurgeAlerts.map((alert) => (
            <div key={alert.productName} className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
              Sales Surge Alert: {alert.productName} has seen a significant increase in sales! (Surge: {alert.surgeAmount} units)
            </div>
          ))
        ) : (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">No sales surge alerts</div>
        )}
      </div>
    </section>
  );
}

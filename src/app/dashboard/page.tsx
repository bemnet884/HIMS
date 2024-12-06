'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import KeyMetricsOverview from './KeyMetricsOverview';
import SalesInsights from './SalesInsights';
import InventoryMonitoring from './InventoryMonitoring';
import FinancialInsights from './FinancialInsights';
import AlertsAndNotifications from './AlertsAndNotifications';
import DashboardNavbar from './DashboardNav';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="px-4 pb-4 sm:px-6 md:px-8 lg:px-10">
        {/* Key Metrics Overview */}
        <section className="mb-8" id="key-metrics">
          <KeyMetricsOverview />
        </section>

        {/* Sales Insights */}
        <section className="mb-8" id="sales-insights">
          <SalesInsights />
        </section>

        {/* Inventory Monitoring */}
        <section className="mb-8" id="inventory-monitoring">
          <InventoryMonitoring />
        </section>

        {/* Financial Insights */}
        <section className="mb-8" id="financial-insights">
          <FinancialInsights />
        </section>

        {/* Alerts and Notifications */}
        <section className="mb-8" id="alerts">
          <AlertsAndNotifications />
        </section>
      </div>
    </div>
  );
}

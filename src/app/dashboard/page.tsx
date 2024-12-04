'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import KeyMetricsOverview from "./KeyMetricsOverview";
import SalesInsights from "./SalesInsights";
import InventoryMonitoring from "./InventoryMonitoring";
import FinancialInsights from "./FinancialInsights";
import AlertsAndNotifications from "./AlertsAndNotifications";
import DashboardNavbar from "./DashboardNav";

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="px-4 pb-4 sm:px-6 md:px-8 lg:px-10">
        {/* Key Metrics Overview */}
        <section className="mb-8">
          <KeyMetricsOverview />
        </section>

        {/* Sales Insights */}
        <section className="mb-8">
          <SalesInsights />
        </section>

        {/* Inventory Monitoring */}
        <section className="mb-8">
          <InventoryMonitoring />
        </section>

        {/* Financial Insights */}
        <section className="mb-8">
          <FinancialInsights />
        </section>

        {/* Alerts and Notifications */}
        <section className="mb-8">
          <AlertsAndNotifications />
        </section>
      </div>
    </div>
  );
}

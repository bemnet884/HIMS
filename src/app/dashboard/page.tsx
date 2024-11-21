'use client'
// pages/dashboard.tsx
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
    <div>
      <DashboardNavbar />
      <div className="px-4 pb-4 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
        <KeyMetricsOverview />
        {/* Key Metrics Overview Cards
              <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader>Total Inventory Value</CardHeader>
          <CardContent className="text-lg font-bold">$45,000</CardContent>
        </Card>
        <Card>
          <CardHeader>Stock Levels</CardHeader>
          <CardContent>In Stock: 320 | Low: 45 | Out: 10</CardContent>
        </Card>
        <Card>
          <CardHeader>Total Revenue</CardHeader>
          <CardContent className="text-lg font-bold">$75,000</CardContent>
        </Card>
        <Card>
          <CardHeader>Net Profit</CardHeader>
          <CardContent>$25,000</CardContent>
        </Card>
      </section> */}

        {/* Sales Insights 
      */}
        <SalesInsights />


        <InventoryMonitoring />
        {/* Inventory Monitoring
      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4">Inventory Monitoring</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>Stock Forecasting</CardHeader>
            <CardContent>
              linechart
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Inventory Turnover</CardHeader>
            <CardContent>15% This Month</CardContent>
          </Card>
          <Card>
            <CardHeader>Low-Stock Alerts</CardHeader>
            <CardContent>5 Items Need Restocking</CardContent>
          </Card>
        </div>
      </section> */}
        <FinancialInsights />

        {/* Financial Insights
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
              <TableRow>
                <TableCell>Logistics</TableCell>
                <TableCell>$5,000</TableCell>
              </TableRow>
            </Table>
          </TabsContent>
          <TabsContent value="profit-margin">
            <BarChartComponent />
          </TabsContent>
          <TabsContent value="roi">
            <PieChartComponent />
          </TabsContent>
        </Tabs>
      </section> */}

        <AlertsAndNotifications />
        {/* Alerts and Notifications

      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            Low Stock Alert: Product X needs restocking!
          </div>
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
            Sales Surge Alert: Product Y has seen a 150% increase in sales!
          </div>
        </div>
      </section>*/}

        {/* Customer Insights
      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4">Customer Insights</h2>
        <Card>
          <CardHeader>Customer Segmentation</CardHeader>
          <CardContent>
            piechart
          </CardContent>
        </Card>
      </section> */}

      </div>
    </div>
  );
}
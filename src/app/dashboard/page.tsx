import { getMetrics, Metrics } from '@/lib/getMetrics';
import MetricCard from '@/components/MetricCard';
import { CheckCircle, DollarSign, MessageCircleWarning, ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import { PieChartComponent } from '@/components/(charts)/piechart';
import { BarChartComponent } from '@/components/(charts)/barchart';
import SalesList from '../sales/page';

const Dashboard = async () => {
  const metrics: Metrics = await getMetrics();

  return (
    <div className="min-h-screen py-10">
      <MaxWidthWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-7">
          <MetricCard
            title="Total Revenue"
            amount={`$${metrics.totalRevenue.toLocaleString()}`}
            icon={<TrendingUp className="text-green-500" />}
            changePercentage={metrics.revenueChange}
          />
          <MetricCard
            title="Total Expenses"
            amount={`$${metrics.totalExpenses.toLocaleString()}`}
            icon={<TrendingDown className="text-red-500" />}
            cautionIcon={<MessageCircleWarning className="text-yellow-400" />}
          />
          <MetricCard
            title="Net Profit"
            amount={`$${metrics.netProfit.toLocaleString()}`}
            icon={<CheckCircle className="text-blue-500" />}
            profitMargin={metrics.profitMargin}
          />
          <MetricCard
            title="Total Products Sold"
            amount={metrics.totalProductsSold.toLocaleString()}
            icon={<ShoppingCart className="text-indigo-500" />}
            trendIndicator={metrics.salesTrend}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-16">
          <PieChartComponent />
          <BarChartComponent />
        </div>

        <SalesList />
      </MaxWidthWrapper>
    </div>
  );
};

export default Dashboard;

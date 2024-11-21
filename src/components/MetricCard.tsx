import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Circle, MoreVertical } from 'lucide-react';
import React from 'react';

interface MetricCardProps {
  title?: string;
  amount: string;
  description?: string;
  icon: React.ReactNode;
  changePercentage?: number;
  cautionIcon?: React.ReactNode;
  profitMargin?: number;
  trendIndicator?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  description,
  icon,
  changePercentage,
  cautionIcon,
  profitMargin,
  trendIndicator,
  className,
}) => {
  return (
    <Card className={`mt-5 rounded-xl shadow-lg ${className}`}>
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="text-xl text-gray-500">{icon}</div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
          {changePercentage !== undefined && (
            <p className={`text-sm mt-1 ${changePercentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {changePercentage > 0 ? '+' : ''}
              {changePercentage}% since last period
            </p>
          )}
          <div className='mt-1'>
            {profitMargin !== undefined && (
              <p className="text-sm text-blue-500">Profit Margin: {profitMargin.toFixed(1)}%</p>
            )}
            {trendIndicator && (
              <p className={`text-sm ${trendIndicator === 'up' ? 'text-green-500' : trendIndicator === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                Sales Trend: {trendIndicator}
              </p>
            )}
            {cautionIcon && <div className="mt-1">{cautionIcon}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import React from 'react';
import { Icon as LucideIcon } from 'lucide-react';
import { LineChartComponent } from "./(charts)/linechart";

// Define prop types
interface MetricCardProps {
  title: string;
  amount: string | number;
  description: string;
  icon: React.ReactNode; // Adding the icon prop
  changePercentage?: number; // Optional percentage change prop
  trendData?: number[]; // Optional prop for trend data
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  description,
  icon,
  changePercentage,
  trendData,
}) => {
  return (
    <Card className="p-4 shadow-md bg-white rounded-xl flex flex-col justify-between">
      <CardHeader className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            {icon} {/* Display the icon here */}
          </div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-800">{amount}</p>
        {changePercentage !== undefined && (
          <p className={`text-sm ${changePercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {changePercentage > 0 ? `+${changePercentage}% from last period` : `${changePercentage}% from last period`}
          </p>
        )}
        {trendData && <LineChartComponent data={trendData} />} {/* Mini-chart component placeholder */}
      </CardContent>
      <CardFooter>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardFooter>
    </Card>
  );
};

export default MetricCard;

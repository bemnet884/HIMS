// components/TopSoldProducts.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { getTopSoldProducts } from '@/actions/productActions';
import React from 'react';

export default async function TopSoldProducts() {
  const topProducts = await getTopSoldProducts(5); // Get top 5 products

  return (
    <Card>
      <CardHeader>Top Selling Products</CardHeader>
      <CardContent>
        <ul>
          {topProducts.map((product, index) => (
            <li key={index} className="flex justify-between py-2 border-b">
              <span>{product.name}</span>
              <span>{product.totalQuantitySold} units sold</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}



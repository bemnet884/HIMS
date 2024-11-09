'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSale } from '@/actions/salesAction';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'; // Adjust the path based on your project structure
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure

export default function NewSalePage() {

  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    employeeId: '',
  });
  const [error, setError] = useState<string | null>(null); // State for error messages
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission
    try {
      await createSale({
        productId: parseInt(form.productId),
        quantity: parseInt(form.quantity),
      });
      router.push('/sales');
    } catch (err: any) {
      // Handle specific error scenarios
      if (err instanceof Error) {
        setError(err.message); // Display the error message from the server
      } else {
        setError('An unexpected error occurred. Please try again later.'); // Fallback error message
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Sale</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-300 rounded">
              {error} {/* Display error message */}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Product ID</label>
              <input
                type="text"
                name="productId"
                value={form.productId}
                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                className="form-input mt-1 block w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="form-input mt-1 block w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <Button type="submit" className="mt-4 w-full">
              Save Sale
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

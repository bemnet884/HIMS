'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPurchase } from '@/actions/purchaseActions';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'; // Adjust the path based on your project structure
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure

export default function NewPurchasePage() {
  const [form, setForm] = useState({ productId: '', quantity: '', total: '', employeeId: '', supplier: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Set loading state to true

    try {
      await createPurchase({
        productId: parseInt(form.productId),
        quantity: parseInt(form.quantity),
        total: parseFloat(form.total),
        supplier: form.supplier,
        employeeId: parseInt(form.employeeId),
      });
      router.push('/purchases');
    } catch (err) {
      setError("An error occurred while saving the purchase."); // Customize this error message as needed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Purchase</CardTitle>
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
                required // Add required validation
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
                required // Add required validation
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total</label>
              <input
                type="text"
                name="total"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
                className="form-input mt-1 block w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                required // Add required validation
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                className="form-input mt-1 block w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                required // Add required validation
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                className="form-input mt-1 block w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                required // Add required validation
              />
            </div>
            <Button type="submit" className={`mt-4 w-full ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={loading}>
              {loading ? 'Saving...' : 'Save Purchase'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

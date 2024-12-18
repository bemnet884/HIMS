'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { createPurchase } from '@/actions/purchaseActions';

export default function NewPurchasePage() {
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    total: '',
    supplier: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createPurchase({
        productId: parseInt(form.productId),
        quantity: parseInt(form.quantity),
        total: parseFloat(form.total),
        supplier: form.supplier,
      });
      router.push('/purchases');
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsModalOpen(true)} className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition duration-200 ease-in-out rounded-lg">
            Add New Purchase
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 transform scale-95 sm:scale-100">
          <DialogTitle className="text-2xl font-semibold text-gray-800">Add New Purchase</DialogTitle>
          <DialogDescription>
            <Card className="w-full bg-gray-50 rounded-xl p-6 mt-4 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">Add a new purchase</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product ID</label>
                    <input
                      type="text"
                      name="productId"
                      value={form.productId}
                      onChange={(e) => setForm({ ...form, productId: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter product ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total</label>
                    <input
                      type="number"
                      name="total"
                      step="0.01"
                      value={form.total}
                      onChange={(e) => setForm({ ...form, total: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter total cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      value={form.supplier}
                      onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter supplier name"
                    />
                  </div>

                  <Button type="submit" className="mt-6 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
                    Save Purchase
                  </Button>
                </form>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

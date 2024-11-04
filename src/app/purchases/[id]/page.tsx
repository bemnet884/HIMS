// /app/purchases/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getPurchaseById, updatePurchase } from '@/actions/purchaseActions';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function PurchaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const purchaseId = parseInt(params.id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    quantity: '',
    total: '',
    supplier: '',
  });

  useEffect(() => {
    async function fetchPurchase() {
      const purchase = await getPurchaseById(purchaseId);
      if (purchase) {
        setForm({
          quantity: purchase.quantity.toString(),
          total: purchase.total.toString(),
          supplier: purchase.supplier || '',
        });
      } else {
        router.push('/404');
      }
    }
    fetchPurchase();
  }, [purchaseId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePurchase(purchaseId, {
      quantity: parseInt(form.quantity),
      total: parseFloat(form.total),
      supplier: form.supplier,
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{isEditing ? 'Edit Purchase' : 'Purchase Details'}</h1>

      {!isEditing ? (
        <div>
          <p><strong>Quantity:</strong> {form.quantity}</p>
          <p><strong>Total:</strong> ${form.total}</p>
          <p><strong>Supplier:</strong> {form.supplier}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 text-white">Edit Purchase</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Total</label>
            <input
              type="number"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Supplier</label>
            <input
              type="text"
              value={form.supplier}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <Button type="submit" className="mt-4 bg-blue-600 text-white">Save Changes</Button>
          <Button onClick={() => setIsEditing(false)} className="mt-4 bg-gray-300 text-gray-700">Cancel</Button>
        </form>
      )}
    </div>
  );
}

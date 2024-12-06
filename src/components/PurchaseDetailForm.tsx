"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Purchase } from "@prisma/client";

interface PurchaseDetailFormProps {
  purchase: Purchase;
  onSave: (data: { quantity?: number; total?: number; supplier?: string }) => void;
  onClose: () => void;
}

export default function PurchaseDetailForm({ purchase, onSave, onClose }: PurchaseDetailFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    quantity: purchase.quantity.toString(),
    total: purchase.total.toString(),
    supplier: purchase.supplier || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      quantity: parseInt(form.quantity),
      total: parseFloat(form.total),
      supplier: form.supplier,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Total</label>
        <input
          type="number"
          step="0.01"
          value={form.total}
          onChange={(e) => setForm({ ...form, total: e.target.value })}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Supplier</label>
        <input
          type="text"
          value={form.supplier}
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Save Changes
        </Button>
        <Button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-200">
          Cancel
        </Button>
      </div>
    </form>
  );
}

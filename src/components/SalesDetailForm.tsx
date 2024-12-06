// /components/SalesDetailForm.tsx (Client Component)
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Sale } from "@prisma/client";
import { updateSale } from "@/actions/salesAction";

interface SalesDetailFormProps {
  sale: Sale;
  onClose: () => void; // Type for onClose
}

export default function SalesDetailForm({ sale, onClose }: SalesDetailFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    productId: sale.productId,
    quantity: sale.quantity.toString(),
    total: sale.total.toString(),
    saleDate: sale.saleDate ? new Date(sale.saleDate).toISOString().split("T")[0] : "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateSale(sale.id, {
      productId: form.productId,
      quantity: parseInt(form.quantity),
      total: parseFloat(form.total),
      saleDate: new Date(form.saleDate),
    });
    onClose();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product ID</label>
        <input
          type="number"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: parseInt(e.target.value) })}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
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
        <label className="block text-sm font-medium text-gray-700">Sale Date</label>
        <input
          type="date"
          value={form.saleDate}
          onChange={(e) => setForm({ ...form, saleDate: e.target.value })}
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

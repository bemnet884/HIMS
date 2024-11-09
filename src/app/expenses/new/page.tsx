'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createExpense } from '@/actions/expenseActions';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'; // Adjust the import based on your project structure
import { Button } from '@/components/ui/button';

export default function NewExpensePage() {
  const [form, setForm] = useState({ amount: '', employeeId: '', description: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createExpense({
      description: form.description,
      amount: parseFloat(form.amount),
    });
    router.push('/expenses');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="form-input mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="form-input mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">
              Save Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

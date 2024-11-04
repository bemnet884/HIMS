// /app/expenses/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getExpenseById, updateExpense } from '@/actions/expenseActions';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ExpenseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const expenseId = parseInt(params.id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    description: '',
    amount: '',
  });

  useEffect(() => {
    async function fetchExpense() {
      const expense = await getExpenseById(expenseId);
      if (expense) {
        setForm({
          description: expense.description || '',
          amount: expense.amount.toString(),
        });
      } else {
        router.push('/404');
      }
    }
    fetchExpense();
  }, [expenseId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExpense(expenseId, {
      description: form.description,
      amount: parseFloat(form.amount),
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{isEditing ? 'Edit Expense' : 'Expense Details'}</h1>

      {!isEditing ? (
        <div>
          <p><strong>Description:</strong> {form.description}</p>
          <p><strong>Amount:</strong> ${parseFloat(form.amount).toFixed(2)}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 text-white">
            Edit Expense
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
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

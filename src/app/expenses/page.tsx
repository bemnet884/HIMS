import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getExpenses } from "@/actions/expenseActions";
import DeleteExpenseButton from "@/components/DeleteExpenseButton";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ExpensesNavbar from './ExpensesNavbar';

export default async function ExpenseList() {
  const expenses = await getExpenses();
  return (
    <>
      <ExpensesNavbar />
    <div className="w-full h-screen flex items-center justify-center">
      <MaxWidthWrapper className='h-full'>
          <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link href="/expenses/new">
              <Button>Create New Expense</Button>
            </Link>
          </div>
          <table className="w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
                  <th className="border p-2">Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="border p-2">{expense.description}</td>
                  <td className="border p-2">${expense.amount}</td>
                  <td className="border p-2">{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <Link href={`/expenses/${expense.id}`}>
                      <Button>View</Button>
                    </Link>
                    <DeleteExpenseButton expenseId={expense.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaxWidthWrapper>
      </div>
    </>

  );
}

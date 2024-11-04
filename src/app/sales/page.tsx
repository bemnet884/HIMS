// /app/sales/page.tsx
import prisma from "@/lib/db";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteSalesButton from "@/components/DeleteSalesButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function SalesList() {
  const sales = await prisma.sale.findMany({
    include: { product: true, employee: true },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MaxWidthWrapper className='h-full'>
        <div className="mx-auto py-10 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">Sales List</h1>
            <Link href="/sales/new">
              <Button>Create New Sale</Button>
            </Link>
          </div>

          <table className="w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Sale Date</th>
                <th className="border p-2">Employee</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="border p-2">{sale.product.name}</td>
                  <td className="border p-2">{sale.quantity}
                  </td>
                  <td className="border p-2">{sale.product.price}
                  </td>
                  <td className="border p-2">${sale.total.toFixed(2)}</td>
                  <td className="border p-2">{new Date(sale.saleDate).toLocaleDateString()}</td>
                  <td className="border p-2">{sale.employee.name}</td>
                  <td className="border p-2 flex justify-start gap-4">
                    <Link href={`/sales/${sale.id}`}>
                      <Button>View</Button>
                    </Link>
                    <DeleteSalesButton salesId={sale.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></MaxWidthWrapper>
    </div>
  );
}

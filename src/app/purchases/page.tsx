// /app/sales/page.tsx
import prisma from "@/lib/db";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeletePurchaseButton from "@/components/DeletePurchaseButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function PurchaseList() {
  const purchases = await prisma.purchase.findMany({
    include: { product: true },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MaxWidthWrapper className='h-full'>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">Purchase List</h1>
            <Link href="/purchases/new">
              <Button>Create New Purchase</Button>
            </Link>
          </div>

          <table className="w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Purchase Date</th>
                <th className="border p-2">Employee</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border p-2">{purchase.product.name}</td>
                  <td className="border p-2">{purchase.quantity}</td>
                  <td className="border p-2">${purchase.total.toFixed(2)}</td>
                  <td className="border p-2">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>

                  <td className="border p-2">
                    <Link href={`/purchases/${purchase.id}`}>
                      <Button>View</Button>
                    </Link>
                    <DeletePurchaseButton purchaseId={purchase.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </MaxWidthWrapper>
    </div>
  );
}

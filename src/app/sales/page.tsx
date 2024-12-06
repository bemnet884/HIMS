import DeleteSalesButton from "@/components/DeleteSalesButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getSales } from "@/actions/salesAction";
import NewSalePage from "./new/page";
import SalesNavbar from "./SalesNavbar";
import EditSalesDialog from "@/components/EditSalesDialog";
import { SetStateAction } from "react";

type Sale = Awaited<ReturnType<typeof getSales>>[number];

export default async function SalesList() {
  const sales = await getSales();

  return (<>
    <SalesNavbar />
    <div className="w-full h-screen flex items-center justify-center">
      <MaxWidthWrapper className="h-full">
        <div className="mx-auto py-10 px-4">
          <div className="flex items-center justify-between">
            <NewSalePage />
          </div>

          <table className="w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Sold Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Sale Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="border p-2">{sale.product.id}</td>
                  <td className="border p-2">{sale.product.name}</td>
                  <td className="border p-2">{sale.quantity}</td>
                  <td className="border p-2">${sale.product.price.toFixed(2)}</td>
                  <td className="border p-2">${sale.total.toFixed(2)}</td>
                  <td className="border p-2">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 flex justify-start gap-4">
                    <EditSalesDialog sale={sale} />
                    <DeleteSalesButton salesId={sale.id} />
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
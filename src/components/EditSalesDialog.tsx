'use client'
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { getSaleById, updateSale } from "@/actions/salesAction";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Sale = Awaited<ReturnType<typeof getSaleById>>;

interface EditSaleDialogProps {
  sale: Sale;
}

export default function EditSaleDialog({ sale }: EditSaleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Render loading or error state instead of returning early
  if (!sale) {
    return <div>Loading...</div>; // Or any error message you'd prefer
  }

  const [form, setForm] = useState({
    productId: sale.productId,
    quantity: sale.quantity,
    total: sale.total,
  });

  const handleQuantityChange = (quantity: number) => {
    const updatedTotal = quantity * sale.product.price;
    setForm((prevForm) => ({ ...prevForm, quantity, total: updatedTotal }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sale.id) {
      await updateSale(sale.id, {
        productId: form.productId,
        quantity: form.quantity,
        total: form.total,
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl rounded-lg px-4 py-2 transition duration-200 ease-in-out">
        View Sales Detail
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto transform scale-95 sm:scale-100 transition-transform duration-300">
          <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Sale</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product ID</label>
              <input
                type="number"
                name="productId"
                value={form.productId}
                onChange={(e) =>
                  setForm({ ...form, productId: parseInt(e.target.value) || 0 })
                }
                className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                required
                placeholder="Enter Product ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                required
                placeholder="Enter Quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total</label>
              <input
                type="number"
                name="total"
                value={form.total}
                readOnly
                className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm bg-gray-100 focus:outline-none transition duration-200 placeholder-gray-400"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button type="submit" className="bg-blue-500 text-white rounded-lg px-5 py-2 shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
                Save Changes
              </Button>
              <Button onClick={() => setIsOpen(false)} className="bg-gray-200 text-gray-700 rounded-lg px-5 py-2 shadow-md hover:bg-gray-300 transition duration-200 ease-in-out">
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

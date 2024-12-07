'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateSale, getSaleById } from '@/actions/salesAction';
import { getProductById } from '@/actions/productActions'; // Assuming this function exists
import { Button } from '@/components/ui/button';

export default function SaleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const saleId = parseInt(params.id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    productId: '',
    productName: '',
    quantity: '',
    total: '',
    saleDate: '',
  });
  const [productPrice, setProductPrice] = useState(0);

  // Fetch sale data and product price on mount
  useEffect(() => {
    async function fetchSale() {
      const sale = await getSaleById(saleId);
      if (sale) {
        setForm({
          productId: sale.productId.toString(),
          productName: sale.product.name,
          quantity: sale.quantity.toString(),
          total: sale.total.toString(),
          saleDate: new Date(sale.saleDate).toLocaleDateString(),
        });
        setProductPrice(sale.product.price); // Set initial product price
      } else {
        router.push('/404');
      }
    }
    fetchSale();
  }, [saleId, router]);

  // Fetch product price whenever productId changes
  useEffect(() => {
    async function fetchProductPrice() {
      if (form.productId) {
        const product = await getProductById(parseInt(form.productId));
        if (product) {
          setProductPrice(product.price);
          // Update the total based on the new product price and existing quantity
          setForm((prevForm) => ({
            ...prevForm,
            total: (product.price * parseInt(prevForm.quantity)).toString(),
          }));
        }
      }
    }
    fetchProductPrice();
  }, [form.productId]);

  // Update total when quantity changes
  const handleQuantityChange = (quantity: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      quantity,
      total: (productPrice * parseInt(quantity)).toString(), // Update total based on new quantity
    }));
  };

  // Handle form submission to update the sale
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSale(saleId, {
      productId: parseInt(form.productId),
      quantity: parseInt(form.quantity),
      total: parseFloat(form.total),
      saleDate: new Date
    });
    setIsEditing(false);
    router.refresh(); // Refresh the page to reflect updated data
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {isEditing ? 'Edit Sale' : 'Sale Details'}
      </h1>

      {!isEditing ? (
        // View Mode
        <div className="space-y-4">
          <p><strong>Product:</strong> {form.productName}</p>
          <p><strong>Quantity:</strong> {form.quantity}</p>
          <p><strong>Total:</strong> ${parseFloat(form.total).toFixed(2)}</p>
          <p><strong>Date:</strong> {form.saleDate}</p>

          <Button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
          >
            Update Sale
          </Button>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="number"
              name="productId"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total</label>
            <input
              type="number"
              name="total"
              value={form.total}
              readOnly // Make total field read-only
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
            </div>
          <div className="flex space-x-4 mt-6">
            <Button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

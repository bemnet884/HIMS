// /app/products/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '@/actions/productActions';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
  });

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProductById(productId);
      if (product) {
        setForm({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          stockQuantity: product.stockQuantity.toString(),
        });
      } else {
        router.push('/404');
      }
    }
    fetchProduct();
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(productId, {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity),
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">{isEditing ? 'Edit Product' : `Product Details: ${form.name}`}</h1>

      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Description:</strong> {form.description}</p>
          <p><strong>Price:</strong> ${form.price}</p>
          <p><strong>Stock Quantity:</strong> {form.stockQuantity}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 text-white">Edit Product</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock Quantity</label>
            <input
              type="number"
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
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

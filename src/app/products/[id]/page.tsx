// /app/products/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '@/actions/productActions';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setIsDialogOpen(false);
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Product Details: {form.name}
      </h1>

      <div>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Description:</strong> {form.description}</p>
        <p><strong>Price:</strong> ${form.price}</p>
        <p><strong>Stock Quantity:</strong> {form.stockQuantity}</p>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 bg-blue-600 text-white">Edit Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Make changes to the product details and save them.</DialogDescription>
            </DialogHeader>
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
              <div className="flex justify-end gap-4">
                <Button type="submit" className="bg-blue-600 text-white">Save Changes</Button>
                <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-300 text-gray-700">Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
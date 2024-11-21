'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/actions/productActions';
import { z } from 'zod';
import { productSchema } from '@/lib/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
}

export default function NewProductPage() {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData = productSchema.safeParse({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity),
    });

    if (!parsedData.success) {
      const formattedErrors = parsedData.error.format();
      setErrors(formattedErrors);
      return;
    }

    await createProduct(parsedData.data);
    setSuccessMessage("Product successfully added!");
    setForm({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
    });
    setTimeout(() => {
      setSuccessMessage(null); // Reset success message after 3 seconds
    }, 3000);
    router.push('/products');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name._errors[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description._errors[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.price && <p className="text-red-500 text-xs">{errors.price._errors[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Enter stock quantity"
                  value={form.stockQuantity}
                  onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.stockQuantity && <p className="text-red-500 text-xs">{errors.stockQuantity._errors[0]}</p>}
              </div>

              {successMessage && (
                <div className="text-green-600 bg-green-100 border border-green-300 p-3 rounded-md">
                  {successMessage}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Save Product
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

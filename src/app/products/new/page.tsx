// /app/products/new/page.tsx
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
  const [errors, setErrors] = useState<any>({}); // Set a type or interface for errors if needed
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data against the productSchema
    const parsedData = productSchema.safeParse({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity),
    });

    if (!parsedData.success) {
      // Set errors from Zod validation
      const formattedErrors = parsedData.error.format();
      setErrors(formattedErrors);
      return;
    }

    await createProduct(parsedData.data);
    router.push('/products');
  };

  return (<>
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name && <p className="text-red-500">{errors.name._errors[0]}</p>}
            </div>
            <div>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="form-input mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && <p className="text-red-500">{errors.description._errors[0]}</p>}
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="form-input mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.price && <p className="text-red-500">{errors.price._errors[0]}</p>}
            </div>
            <div>
              <input
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={form.stockQuantity}
                onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                className="form-input mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.stockQuantity && <p className="text-red-500">{errors.stockQuantity._errors[0]}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Product
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  </>
  );
}

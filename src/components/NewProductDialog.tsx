// /components/NewProductDialog.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/productActions";
import { z } from "zod";
import { productSchema } from "@/lib/zod";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function NewProductDialog() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with Zod schema
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
    setIsOpen(false); // Close modal after submission
    router.push("/products");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add New Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Enter the details of the new product below.</DialogDescription>
        </DialogHeader>
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
          <Button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Save Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
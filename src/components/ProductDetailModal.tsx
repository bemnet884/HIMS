// components/ProductDetailModal.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateProduct } from '@/actions/productActions';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ProductDetailModalProps {
  product: { id: number; name: string; description: string; price: number; stockQuantity: number };
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description || '',
    price: product.price.toString(),
    stockQuantity: product.stockQuantity.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(product.id, {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity),
    });
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Product' : 'Product Details'}</DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Price"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Description"
            ></textarea>
            <input
              type="number"
              name="stockQuantity"
              value={form.stockQuantity}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Stock Quantity"
            />

            <DialogFooter>
              <Button type="submit" className="bg-blue-600 text-white">Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
            <DialogFooter>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;

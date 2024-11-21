// /components/ProductDetailDialog.tsx (Client Component)
"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductDetailForm from "@/components/ProductDetailForm"; // Form component for editing
import { Product } from "@prisma/client";
interface ProductDetailDialogProps {
  product: Product;  // Type the product prop
}
export default function ProductDetailDialog({ product }: ProductDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto transform scale-95 sm:scale-100 transition-transform duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Product</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Make changes to the product details and save them.
          </DialogDescription>
        </DialogHeader>
        <ProductDetailForm product={product} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

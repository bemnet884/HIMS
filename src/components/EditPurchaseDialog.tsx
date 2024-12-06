"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Purchase } from "@prisma/client";
import PurchaseDetailForm from "./PurchaseDetailForm";
import { updatePurchase } from "@/actions/purchaseActions";

interface EditPurchaseDialogProps {
  purchase: Purchase; // Type the purchase prop
}

export default function EditPurchaseDialog({ purchase }: EditPurchaseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async (updatedData: { quantity?: number; total?: number; supplier?: string }) => {
    try {
      await updatePurchase(purchase.id, updatedData);
      setIsOpen(false);
      window.location.reload(); // Optionally refresh the page or use a more efficient method
    } catch (error) {
      console.error("Error updating purchase:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Edit Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto transform scale-95 sm:scale-100 transition-transform duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Purchase</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Update the purchase details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <PurchaseDetailForm purchase={purchase} onSave={handleUpdate} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

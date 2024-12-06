// /components/EditSalesDialog.tsx (Client Component)
"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// Form component for editing
import { Sale } from "@prisma/client";
import SalesDetailForm from "./SalesDetailForm";

interface EditSalesDialogProps {
  sale: Sale; // Type the sale prop
}

export default function EditSalesDialog({ sale }: EditSalesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Edit Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto transform scale-95 sm:scale-100 transition-transform duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Sale</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Update the sale details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <SalesDetailForm sale={sale} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

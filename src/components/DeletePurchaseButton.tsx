// components/DeleteSalesButton.tsx
'use client';

import { useState } from 'react';
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { deletePurchase } from '@/actions/purchaseActions';

interface DeletePurchaseButtonProps {
  purchaseId: number;
}

const DeletePurchaseButton: React.FC<DeletePurchaseButtonProps> = ({ purchaseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deletePurchase(purchaseId);
    // Optionally, refresh the product list or redirect
    window.location.reload(); // Or implement a better way to refresh the list
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
        Delete
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product?"
      />
    </>
  );
};

export default DeletePurchaseButton;

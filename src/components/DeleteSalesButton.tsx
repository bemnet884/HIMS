'use client';

import { useState } from 'react';
import { deleteSale } from "@/actions/salesAction";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";

interface DeleteSalesButtonProps {
  salesId: number;
}

const DeleteSalesButton: React.FC<DeleteSalesButtonProps> = ({ salesId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSale(salesId);
      // Optionally refresh the product list or related data
      window.location.reload(); // Replace with a more efficient refresh if possible
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
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
        message="Are you sure you want to delete this sale? This action will also update related product quantities."
      />
    </>
  );
};

export default DeleteSalesButton;

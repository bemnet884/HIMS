'use client';

import { useState } from 'react';
import { deleteProduct } from "@/actions/productActions";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { deleteExpense } from '@/actions/expenseActions';

interface DeleteExpenseButtonProps {
  expenseId: number;
}

const DeleteExpenseButton: React.FC<DeleteExpenseButtonProps> = ({ expenseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteExpense(expenseId);
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

export default DeleteExpenseButton;

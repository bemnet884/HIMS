'use client';

import { useState } from 'react';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6">
      <Button onClick={openModal} className="bg-blue-600 text-white">View Product Details</Button>

      {isModalOpen && <ProductDetailModal onClose={closeModal} />}
    </div>
  );
}

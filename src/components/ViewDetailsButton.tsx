// components/ViewProductButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProductDetailModal from './ProductDetailModal';
import { getProductById } from '@/actions/productActions';

interface ViewProductButtonProps {
  productId: number;
}

const ViewProductButton: React.FC<ViewProductButtonProps> = ({ productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isModalOpen && !product) {
      (async () => {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      })();
    }
  }, [isModalOpen, product, productId]);

  const handleClose = () => {
    setIsModalOpen(false);
    setProduct(null);
  };

  return (
    <>
      <Button variant="link" onClick={() => setIsModalOpen(true)}>
        View Details
      </Button>
      {isModalOpen && product && (
        <ProductDetailModal
          product={product}
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ViewProductButton;

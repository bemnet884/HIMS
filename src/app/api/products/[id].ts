// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateProduct } from '@/actions/productActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { name, price, description, stockQuantity } = req.body;

      await updateProduct(Number(id), { name, price, description, stockQuantity });

      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Failed to update product' });
    }
  }
  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

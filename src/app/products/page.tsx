// app/products/page.tsx

import { getProducts } from "@/actions/productActions";
import DeleteProductButton from "@/components/DeleteProductButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NewProductDialog from "@/components/NewProductDialog";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import TopSoldProducts from "@/components/TopSoldProducts"; // Import the top sold products component
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ProductsNavbar from "./ProductsNavbar";

export default async function Products() {
  const products = await getProducts();

  return (<>
    <ProductsNavbar />

    <MaxWidthWrapper>
      <div className="mx-auto py-10 px-4">
        <div className="flex justify-between items-center">

          <div className="flex items-center justify-center">
            <Button>
              Create New Product</Button>
            {/**
            <NewProductDialog />
             * 
             */}
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

          {products.length > 0 ? (
            products.map((product) => (
            <li
              key={product.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
              </div>

              <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>
              <p className="text-lg font-bold text-green-600 mb-6">${product.price.toFixed(2)}</p>

              <div className="flex justify-between mt-4">
                <ProductDetailDialog />
                <DeleteProductButton productId={product.id} />
              </div>
            </li>
            ))) :
            (
              <h1>No Product available</h1>
            )
          }
        </ul>

      </div>
    </MaxWidthWrapper>
  </>

  );
}

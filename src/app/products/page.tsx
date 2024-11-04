import { getProducts } from "@/actions/productActions";
import DeleteProductButton from "@/components/DeleteProductButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Products() {
  const products = await getProducts();

  return (
    <MaxWidthWrapper>
      <div className="mx-auto py-10 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Latest Products List</h1>
          <Link href={`/products/new`} className={buttonVariants({ size: "lg" })}>
            Add New Product
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
              </div>

              {/* Product Description */}
              <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

              {/* Product Price */}
              <p className="text-lg font-bold text-green-600 mb-6">${product.price.toFixed(2)}</p>

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <Link href={`/products/${product.id}`} className={buttonVariants({ size: "sm", variant: "link" })}>
                  View Details
                </Link>

                <DeleteProductButton productId={product.id} />  {/* Use the new component here */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MaxWidthWrapper>
  );
}

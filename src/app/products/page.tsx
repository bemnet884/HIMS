import { getProducts } from "@/actions/productActions";
import DeleteProductButton from "@/components/DeleteProductButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NewProductDialog from "@/components/NewProductDialog";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import ProductsNavbar from "./ProductsNavbar";

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <ProductsNavbar />
      <MaxWidthWrapper>
        <div className="mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Top Section: Navbar and Add Product */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <div className="flex items-center">
              <NewProductDialog />
            </div>
          </div>

          {/* Products List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product.id}
                  className="bg-white shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Header */}
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
                  </div>

                  {/* Product Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description || "No description available."}
                  </p>

                  {/* Product Price */}
                  <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
                    <ProductDetailDialog product={product} />
                    <DeleteProductButton productId={product.id} />
                  </div>
                </li>
              ))
            ) : (
              <h1 className="col-span-full text-center text-gray-500">
                No products available
              </h1>
            )}
          </ul>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

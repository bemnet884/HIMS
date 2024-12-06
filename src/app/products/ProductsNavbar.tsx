'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, List, Archive, Tag, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MobileNav from "@/components/mobile-nav";
import { ShineyButton } from "@/components/ShineyButton";
import NewProductDialog from "@/components/NewProductDialog"; // Import NewProductDialog component
import { useState } from "react";

const ProductsNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoForward = () => {
    router.forward();
  };

  const navItems = [
    { label: "All Products", icon: <List />, path: "/products" },
    { label: "Add Product", icon: <Plus />, path: "#", isDialog: true }, // Add flag to trigger modal
    { label: "Categories", icon: <Tag />, path: "/products/categories" },
  ];

  return (
    <nav className="sticky mb-5 h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center  px-6 justify-between border-b border-zinc-200">
        <Link href="/products" className="flex z-40 font-semibold">
          <Button variant='ghost' className="flex items-center space-x-1 text-gray-600 hover:text-gray-900" onClick={handleGoBack}>
            <span> <ArrowLeft size={24} /></span>
          </Button>
          <Button variant='ghost' className="flex items-center space-x-1 text-gray-600 hover:text-gray-900" onClick={handleGoForward}>
            <span> <ArrowRight size={24} /></span>
          </Button>
          <span className="text-blue-600 text-2xl font-mono">Products</span>
        </Link>
        <MobileNav />
        <div className="hidden h-full items-center space-x-4 sm:flex">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 p-2 rounded-lg transition ${pathname === item.path ? "bg-gray-200" : "hover:bg-gray-200"}`}
                  onClick={() => {
                    if (item.isDialog) {
                      // Trigger modal open when 'Add Product' is clicked
                      setIsOpen(true);
                    } else {
                      // Navigate to the respective page
                      router.push(item.path);
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <div className="h-8 w-px bg-gray-300" />
            <Link className={buttonVariants({ variant: "ghost", size: "lg" })} href='/dashboard'>
              Dashboard <ArrowRight className="ml-1.5 size-4" />
            </Link>
            <ShineyButton href="/dashboard" className="relative z-10 h-9 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
              Export Data
            </ShineyButton>
          </div>
        </div>
      </div>
      {/* Conditionally render NewProductDialog based on isOpen */}
      {isOpen && <NewProductDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default ProductsNavbar;

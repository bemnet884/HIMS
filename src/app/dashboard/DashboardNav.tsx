// components/DashboardNavbar.tsx
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Box, DollarSign, Bell, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShineyButton } from "@/components/ShineyButton";
import MobileNav from "@/components/mobile-nav";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle going back
  const handleGoBack = () => {
    router.back(); // This will navigate to the previous page
  };
  const handleGoForward = () => {
    router.forward(); // This will navigate to the previous page
  };
  const navItems = [
    { label: "Overview", icon: <Home />, path: "/dashboard#key-metrics" },
    { label: "Sales Insights", icon: <DollarSign />, path: "/dashboard#sales-insights" },
    { label: "Inventory", icon: <Box />, path: "/dashboard#inventory-monitoring" },
    { label: "Financial Insights", icon: <BarChart2 />, path: "/dashboard#financial-insights" },
    { label: "Alerts", icon: <Bell />, path: "/dashboard#alerts" },
  ];

  return (
    <nav className="sticky mb-5 h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">

      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex z-40 font-semibold">
          <Button variant='ghost' className="flex items-center space-x-2 text-gray-600 hover:text-gray-900" onClick={handleGoBack}>
            <span> <ArrowLeft size={24} /></span>
          </Button>
          <Button variant='ghost' className="flex items-center space-x-2 text-gray-600 hover:text-gray-900" onClick={handleGoForward}>
            <span> <ArrowRight size={24} /></span>

          </Button>
          <span className="text-blue-600 text-2xl font-mono">Dashboard</span>
        </Link>
        <MobileNav />
        <div className="hidden h-full items-center space-x-4 sm:flex">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.path} scroll={false}>
                  <Button variant='ghost'
                    className={`flex items-center gap-2 p-2 rounded-lg transition ${pathname === item.path ? "bg-gray-200" : "hover:bg-gray-200"
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-8 w-px bg-gray-300" />
          <ShineyButton href="/dashboard" className="relative  z-10 h-9  text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Export Data</ShineyButton>
        </div>

      </div>

    </nav>
  );
};

export default DashboardNavbar;

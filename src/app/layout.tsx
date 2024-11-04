import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PreviousMap from "postcss/lib/previous-map";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={cn("min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased", inter.className)}>
        <SessionProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <main className="grainy relative flex-1 flex flex-col">
                {/**
                 *   <Link href='/'>
                  <ArrowLeft className="ml-6 mt-6 size-4" />
                </Link>
                 */}

                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

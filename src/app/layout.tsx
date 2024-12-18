import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/loading-spinner"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "HIMS - Inventory Management System",
  description: "HIMS is a powerful inventory management system designed to streamline stock control, sales, and reporting for businesses of all sizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <SidebarProvider>
            <AppSidebar />
          <main className="relative flex-1 flex flex-col">
            {children}
            </main>
        </SidebarProvider>
        </body>
    </html>
  )
}
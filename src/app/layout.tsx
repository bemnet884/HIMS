import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond } from "next/font/google"

import "./globals.css"
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/loading-spinner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "HIMS - Inventory Management System",
  description: "HIMS is a powerful inventory management system designed to streamline stock control, sales, and reporting for businesses of all sizes.",
  keywords: "inventory management, stock control, sales tracking, business software, product management, HIMS",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#3498db", // Optional: Add theme color for mobile browsers
  openGraph: {
    title: "HIMS - Inventory Management System",
    description: "Efficiently manage your inventory with HIMS. Optimize stock levels, track sales, and generate reports to grow your business.",
    url: "https://yourwebsite.com", // Update with your actual website URL

    images: [
      { url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIMS Dashboard Preview" }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    creator: "@yourTwitterHandle",
    title: "HIMS - Inventory Management System",
    description: "A seamless solution for managing your business inventory.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <main className="relative flex-1 flex flex-col">
            <ClerkLoading><LoadingSpinner /></ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

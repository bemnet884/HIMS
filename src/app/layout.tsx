'use client'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Provider } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ClerkProviderWrapper children={children} />
    </ClerkProvider>
  );
}

const ClerkProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isSignInPage = pathname === "/sign-in";
  const isSignUpPage = pathname === "/sign-up";
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        await fetch('/api/syncUser', { method: 'POST' });
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={cn("min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased", inter.className)}>
        <SidebarProvider>
          {!isLandingPage && <AppSidebar />}
          <main className="grainy relative flex-1 flex flex-col">
            <Provider>{children}</Provider>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
};

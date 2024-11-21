import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import MobileNav from "./mobile-nav";
import { SidebarTrigger } from "./ui/sidebar";
import { ShineyButton } from "./ShineyButton";
import { currentUser } from "@clerk/nextjs/server";
import { SignIn, SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";

export default async function Navbar({ className }: { className?: string }) {
  const user = await currentUser()
  console.log(user?.fullName)
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="px-1">

        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-blue-600 text-2xl font-mono">HIMS</span>
          </Link>

          <MobileNav />
          <div className="h-full flex items-center space-x-4">
            {user ? (<>

              <Link
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                  className: "flex items-center gap-1",
                })}
              >
                Dashboard <ArrowRight className="ml-1.5 size-4" />
              </Link>

              <SignedIn>
                <UserButton />
              </SignedIn>



            </>) : (<>

              <Link
                href="/pricing"
                className={buttonVariants({
                  size: "sm",
                    variant: "ghost",
                })}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign in
                </Link>

                <div className="h-8 w-px bg-gray-200" />

              <Link
                href="/sign-up"
                className={buttonVariants({
                  size: "sm",
                  className: "flex items-center gap-1.5",
                })}
              >
                Sign up <ArrowRight className="size-4" />
              </Link></>)}


          </div>
        </div>
      </MaxWidthWrapper>

    </nav >
  );
}
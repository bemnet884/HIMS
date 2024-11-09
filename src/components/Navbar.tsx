import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import MobileNav from "./mobile-nav";
import { SidebarTrigger } from "./ui/sidebar";
import { ShineyButton } from "./ShineyButton";

export default async function Navbar({ className }: { className?: string }) {
  const session = true;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="px-1">

        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-blue-600 text-2xl font-mono">HIMS</span>
          </Link>
          <MobileNav />

          <div className="hidden h-full items-center space-x-4 sm:flex">
            <>
              {!session ? (
                <>
                  <Link href="/pricing" className={buttonVariants({
                    variant: "ghost",
                    size: "sm"
                  })}>Pricing</Link>
                  <Link href="/auth/sign-in" className={buttonVariants({
                    variant: "ghost",
                    size: "sm"
                  })}>
                    Sign In
                  </Link>
                  { /**todo: make the link to go to the sighUP page */}
                  <div className="h-8 w-px bg-gray-300" />
                  <ShineyButton href="/sign-up" className="relative  z-10 h-9  text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Get Started</ShineyButton>

                </>

              ) : (
                <div className="flex gap-3">
                    <form>
                    <Button variant="ghost" type="submit">
                      Sign Out
                    </Button>
                  </form>
                  <Link href="/dashboard" className={buttonVariants({
                    variant: "default",
                    size: "sm"
                  })}>
                    Dashboard <ArrowRight className="ml-1.5 size-4" />
                  </Link>

                </div>

              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>

    </nav >
  );
}
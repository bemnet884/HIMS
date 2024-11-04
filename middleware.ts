import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

/*
export { auth as middleware } from "@/auth";
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
*/
const isProtectedRoute = createRouteMatcher(['/dashboard'])
export default clerkMiddleware((auth,request) => {})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
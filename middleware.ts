import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth
  
  console.log("Is logged: ", isLoggedIn)
  console.log("Route: ", req.nextUrl.pathname)
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search param
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
}
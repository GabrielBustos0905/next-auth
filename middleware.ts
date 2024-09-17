import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"
 
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  console.log(isLoggedIn)
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  if(isApiAuthRoute) return;

  if(isAuthRoute) {
    if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return
  };

  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if(nextUrl.search) callbackUrl += nextUrl.search;

    const encodeCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeCallbackUrl}`, nextUrl));
  };

  return
});
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
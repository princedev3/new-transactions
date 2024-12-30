import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, publicRoute } from "./route";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const isLoggedIn = req.auth;

  const { nextUrl } = req;
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return;

  if (isPublicRoute) return;

  if (isAuthRoute) {
    // Check if user if loggedin and is auth route
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  // check if user is not logged in
  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

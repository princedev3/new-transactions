import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  try {
    const isLoggedIn = req.auth;

    const { nextUrl } = req;

    if (nextUrl.pathname === "/") {
      if (isLoggedIn) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
  }
});

export const config = {
  matcher: ["/"],
};

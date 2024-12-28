import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/current-user";

export async function middleware(request: NextRequest) {
  const session = await currentUser();

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  console.log("middleware", session);
  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};

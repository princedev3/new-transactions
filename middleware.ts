import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.next();
}

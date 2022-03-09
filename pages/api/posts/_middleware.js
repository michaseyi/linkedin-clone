import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (session) {
    return NextResponse.next();
  } else {
    return NextResponse.json({ message: "you are not allowed" });
  }
}

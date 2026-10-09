import { NextResponse } from "next/server";

export function proxy(request) {
  const isLogin = request.cookies.get("isLogin")?.value === "true";
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && isLogin) {
    return NextResponse.redirect(new URL("/products", request.url));
  }
  if (pathname !== "/login" && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/cart", "/login"],
};

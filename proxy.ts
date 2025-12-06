import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/about", request.url));
  }
  return NextResponse.next();
}

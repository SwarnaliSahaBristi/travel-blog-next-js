import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = [
  "/destinations-add",
  "/destinations-manage",
];

export async function proxy(req) {
  const token = await getToken({ req });

  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);

  const isPrivate = privateRoutes.some((route) =>
    reqPath.startsWith(route)
  );

  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/auth/login", req.url)
    loginUrl.searchParams.set("callbackUrl", reqPath)
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/destinations-add", "/destinations-manage"],
};
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/setting";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  // دریافت اطلاعات احراز هویت
  const { sessionClaims, userId } = await auth();

  // اگر کاربر لاگین نکرده، اجازه دسترسی به صفحات عمومی را بده
  if (!userId) {
    return NextResponse.next();
  }

  // دریافت نقش کاربر با بررسی null
  const role = (sessionClaims?.metadata as { role?: string })?.role || "user";

  // بررسی دسترسی بر اساس نقش
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      // اگر نقش کاربر در لیست نقش‌های مجاز نیست
      if (!allowedRoles.includes(role)) {
        // هدایت به صفحه مناسب بر اساس نقش
        const redirectUrl = new URL(
          `/${role === "admin" ? "admin" : "dashboard"}`,
          req.url,
        );
        return NextResponse.redirect(redirectUrl);
      }
      break; // اگر دسترسی داشت، از حلقه خارج شو
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

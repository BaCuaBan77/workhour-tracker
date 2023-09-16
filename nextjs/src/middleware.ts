export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
  // matcher: ["/((?!register|api|login).*)"],
};
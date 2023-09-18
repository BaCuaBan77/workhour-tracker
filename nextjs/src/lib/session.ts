import { getServerSession } from "next-auth/next"

import { authOptions } from "./auth"
import { getSession } from "next-auth/react";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
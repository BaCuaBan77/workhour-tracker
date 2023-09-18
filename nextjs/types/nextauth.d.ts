import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { KeycloakToken } from "."

type UserId = string

declare module "next-auth/jwt" {
  interface JWT extends KeycloakToken {
    
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}
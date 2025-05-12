// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roles: Role[]
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface JWT {
    roles: Role[]
  }
}

export type Role = { id: string, name: "user" | "researcher" | "moderator" | "admin" | "company", description: string }
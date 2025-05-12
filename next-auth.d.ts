import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

type Role = "user" | "researcher" | "moderator" | "admin" | "company"

// Extend `user` object in session and jwt
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      last_name: string;
      email: string;
      created_at: Date;
      updated_at: Date;
      deleted_at: Date | null;
      role: Role;
    } & DefaultSession["user"];
    token: JWT; // optional: expose token in session
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    role: Role;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    role: Role;
    accessToken: string;
    refreshToken: string;
  }
}

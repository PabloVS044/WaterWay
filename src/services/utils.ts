import { PrismaClient } from "@prisma/client";

export type Response<T> = {
  success: boolean;
  data: T | null,
  error: { detail: string } | null;
}

// singleton-ish
export const prisma = new PrismaClient();

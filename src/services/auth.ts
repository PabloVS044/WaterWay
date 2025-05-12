"use server"
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export type Role = "user" | "researcher" | "moderator" | "admin" | "company"

type CredentialsLogin = {
  email: string;
  password: string;
};

type Response<T> = {
  data: T | null,
  error: { detail: string } | null;
}

type User = {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

type JWTResponse = {
  user: Omit<User, 'password'>;
  access: string;
  refresh: string;
}

type SignupDTO = Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>


export async function login({ email, password }: CredentialsLogin): Promise<Response<JWTResponse>> {
  try {
    const user = await prisma.user.findUnique({
      where: { email, deleted_at: null },
    });

    if (!user || !user.password) {
      return {
        data: null,
        error: { detail: 'Invalid email or password' },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        data: null,
        error: { detail: 'Invalid email or password' },
      };
    }

    // Simulate access & refresh tokens
    const accessToken = process.env.AUTH_ACCESS_TOKEN || "";
    const refreshToken = process.env.AUTH_REFRESH_TOKEN || "";

    return {
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          last_name: user.last_name,
          created_at: user.created_at,
          updated_at: user.updated_at,
          deleted_at: user.deleted_at,
          role: user.role,
        },
        access: accessToken,
        refresh: refreshToken,
      },
      error: null,
    };
  } catch (err) {
    console.error('Error during login:', err);
    return {
      data: null,
      error: { detail: 'Internal server error' },
    };
  }
}

export async function signup({ name, last_name, email, password, role }: SignupDTO): Promise<Response<Omit<User, 'password'>>> {
  try {
    // Validate role
    if (!["user", "researcher"].includes(role)) {
      return {
        data: null,
        error: { detail: "No se puede registrar como otro rol que no sea `user` o `researcher`" }
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        data: null,
        error: { detail: "Ya existe un usuario con este correo electrónico" }
      }
    }

    // Encrypt password
    const saltRounds = 10
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        password: encryptedPassword,
        email,
        name,
        last_name,
        role,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    // Remove password from the returned user
    const { password: _, ...userWithoutPassword } = newUser

    return {
      data: userWithoutPassword,
      error: null
    }
  } catch (error) {
    console.error('Signup error:', error)

    // Handle Prisma unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          data: null,
          error: { detail: "Ya existe un usuario con este correo electrónico" }
        }
      }
    }

    return {
      data: null,
      error: { detail: "Ocurrió un error durante el registro" }
    }
  }
}
class CustomError extends Error {

}
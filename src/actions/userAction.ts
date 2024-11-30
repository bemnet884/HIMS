'use server'

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error };
  }
}

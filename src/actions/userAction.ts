'use server'
import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data })
    return {user}
  } catch (error) {
    return {error}
  }
}
export async function getUserById({id,clerkId}: {id?: number, clerkId?: string}) {
  try {
    if (!id && !clerkId) {
      throw new Error('id and clerkId is reqired')
    }
    const query = id ? { id } : { clerkId }
    
    const user = await prisma.user.findUnique({ where: query })
    return {user}
  } catch (error) {
    return {error}
  }
}
export async function updateUser(id: number, data: Partial<User>
) {
  try {
    const user = await prisma.user.update({
      where: {id},
      data
    })
    return {user}
  } catch (error) {
    return {error}
  }
}
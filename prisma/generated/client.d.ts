// prisma/generated/client.d.ts

import { PrismaClient, User } from '@prisma/client'

export const prisma = new PrismaClient()

export type UserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

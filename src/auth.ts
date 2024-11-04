import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "./lib/zod";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                const parsedCredentials = signInSchema.safeParse({ email, password });
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials:", parsedCredentials.error.errors);
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                    include: { role: true }
                });

                if (user && user.passwordHash) {
                    const isValidPassword = await compare(password, user.passwordHash);
                    if (isValidPassword) {
                        return { id: user.id.toString(), name: user.name, email: user.email, role: user.role?.name };
                    }
                }

                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user?.email) return false;

            let dbUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!dbUser) {
                const defaultRole = await prisma.role.findFirst({ where: { name: "user" } }) ?? { id: 1 };
                dbUser = await prisma.user.create({
                    data: {
                        name: user.name ?? "Unknown",
                        email: user.email,
                        passwordHash: "", // Provide a default or hashed password
                        roleId: defaultRole.id,
                    },
                });
            } else {
                dbUser = await prisma.user.update({
                    where: { email: user.email },
                    data: {
                        name: user.name ?? dbUser.name,
                        updatedAt: new Date(),
                    },
                });
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? `${baseUrl}/dashboard` : baseUrl;
        },
        async session({ session, user }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: session.user.email },
                include: { role: true },
            });

            if (dbUser) {
                session.user.role = dbUser.role?.name;
            }

            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET, // Place the secret here
});

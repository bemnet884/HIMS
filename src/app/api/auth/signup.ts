// src/pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import  prisma  from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            // Hash the password
            const hashedPassword = await hash(password, 10);

            // Create user in the database
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    passwordHash: hashedPassword,
                    roleId: 1, // Assign a default role, if applicable
                },
            });

            return res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "An error occurred during sign-up." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
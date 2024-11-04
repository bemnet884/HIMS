"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// Function to handle signing in with credentials
export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    }
                default:
                    return {
                        message: 'Something went wrong.',
                    }
            }
        }
        throw error;
    }
}

// Function to handle signing in with GitHub
export async function handleGithubSignin() {
    await signIn("github", { redirectTo: "/" });
}

// Function to handle signing out
export async function handleSignOut() {
    await signOut();
}

// Function to handle user registration
export async function handleCredentialsSignUp({ name, email, password }: {
    name: string,
    email: string,
    password: string
}) {
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { message: errorData.message || "Sign-up failed" };
        }

        return { message: "User registered successfully" };
    } catch (error) {
        console.error("Error during sign up:", error);
        return { message: "An unexpected error occurred. Please try again." };
    }
}
import { object, string, number } from 'zod';

// Sign-in schema
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid Email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// Product schema

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string(), // Make description optional
  price: z.number().positive("Price must be a positive number"),
  stockQuantity: z.number().int().positive("Stock quantity must be a positive integer"),
});



export const saleSchema = object({
  productId: number({ required_error: "Product ID is required" }),
  quantity: number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
});
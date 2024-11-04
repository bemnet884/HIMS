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
export const productSchema = object({
  name: string({ required_error: "Product name is required" })
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: string()
    .optional(),
  price: number({ required_error: "Price is required" })
    .positive("Price must be a positive number"),
  stockQuantity: number({ required_error: "Stock quantity is required" })
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative"),
});


export const saleSchema = object({
  productId: string({ required_error: "Product ID is required" })
    .regex(/^\d+$/, "Product ID must be a valid number"), // Ensure it's a number string
  quantity: number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  total: number({ required_error: "Total is required" })
    .positive("Total must be a positive number"),
  employeeId: string({ required_error: "Employee ID is required" })
    .regex(/^\d+$/, "Employee ID must be a valid number"), // Ensure it's a number string
});
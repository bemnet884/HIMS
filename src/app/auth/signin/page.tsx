"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"; // Importing NextAuth's signIn method
import Link from "next/link";

export default function SignIn() {
  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credential sign-in
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setGlobalError(result.error); // Display error message if sign-in fails
      } else {
        window.location.href = "/dashboard"; // Redirect to dashboard on successful sign-in
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  // Handle GitHub sign-in
  const handleGithubSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("github");
    } catch (error) {
      setGlobalError("GitHub sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button>
                Sign In
              </Button>
            </form>
          </Form>
          <span className="text-sm text-gray-500 text-center block my-2">
            or
          </span>
          <form className="w-full" onSubmit={handleGithubSignin}>
            <Button
              variant="outline"
              className="w-full"
              type="submit"
            >
              <GitHubLogoIcon className="h-4 w-4 mr-2" />
              Sign in with GitHub
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Don't have an account? </span>
            <Link href="/auth/signup" className="text-sm text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
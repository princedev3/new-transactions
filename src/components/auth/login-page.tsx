"use client";
import React, { Suspense, useState, useTransition } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { loginSchema } from "@/schema";
import Link from "next/link";
import { loginAction } from "@/actions/login-action";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const LoginPages = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      loginAction(values).then((res) => {
        if (res?.error) {
          form.reset();
          setError(res.error);
        }
        if (res?.success) {
          form.reset();
          setSuccess(res.success);
        }
      });
    });
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid place-items-center h-screen ">
        <Card className="grid max-w-xl w-full gap-4">
          <CardTitle className="text-center text-2xl mt-3 text-blue-950">
            Welcome to login
          </CardTitle>
          <CardContent>
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
                      <FormLabel className="capitalize">email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
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
                      <FormLabel className="capitalize">password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="/auth/reset" className="text-sm text-gray-700">
                  Forgot password?
                </Link>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
            <Link
              href="/auth/register"
              className="text-center my-3 text-gray-400 underline cursor-pointer mx-auto flex items-center justify-center"
            >
              click here to create an account
            </Link>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default LoginPages;

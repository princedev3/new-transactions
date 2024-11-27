"use client";
import React, { Suspense, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema";
import { registerAction } from "@/actions/register-action";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      names: "",
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError("");
    setSuccess("");
    if (!values.password || !values.email || !values.names) {
      toast.error("Please fill all fields");
      return;
    }
    startTransition(() => {
      registerAction(values).then((data) => {
        form.resetField("password");

        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen  grid place-items-center">
        <Card className="grid w-full  mx-auto max-w-xl  gap-4 p-4">
          <CardHeader className="text-center text-2xl font-bold capitalize">
            register
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input className="p-5" placeholder="name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="p-5" placeholder="email" {...field} />
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
                          className="p-5"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} className="w-full" type="submit">
                  {isPending ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </Form>
            <Link
              href="/auth/login"
              className="text-center mt-3 text-gray-400 underline cursor-pointer mx-auto flex items-center justify-center"
            >
              click here to login
            </Link>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default Register;

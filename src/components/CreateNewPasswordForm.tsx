"use client";
import { Suspense, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schema";
import { Input } from "./ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Card } from "./ui/card";
import { newPassword } from "@/actions/new-password-action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const CreateNewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          form.reset();
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card className=" w-full max-w-3xl mx-auto grid  p-4">
        {!success && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />

              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </Form>
        )}
        {success && (
          <div className="grid gap-y-4">
            <FormSuccess message={success} />
            <Button type="button" className="w-full">
              <Link href={"/auth/login"}> Login</Link>
            </Button>
          </div>
        )}
      </Card>
    </Suspense>
  );
};

export default CreateNewPasswordForm;

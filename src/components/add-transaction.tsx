"use client";
import React, { Suspense, useEffect, useState, useTransition } from "react";
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
import { transactionSchema } from "@/schema";
import { LoaderCircle } from "lucide-react";
import { useSessionStore } from "./user-session-store";
import { AddTransactionAction } from "@/actions/add-transaction-action";
import { FormSuccess } from "./form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTransaction = () => {
  const user = useSessionStore((state) => state.session?.user);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const session = useSessionStore((state) => state.session);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      title: "",
      type: "",
    },
  });
  function onSubmit(values: z.infer<typeof transactionSchema>) {
    startTransition(() => {
      AddTransactionAction({ ...values, userId: session?.user?.id || "" })
        .then((data) => {
          setSuccess(data.success);
          form.reset();
        })
        .catch((error) => console.log(error));
    });
  }
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-8 grid content-start gap-y-3">
        <h2 className="text-2xl font-medium text-blue-950 capitalize">
          add transaction
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-950">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-950">Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-950 ">Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full text-blue-950">
                        <SelectValue className="" placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent className="focus:outline-blue-950 active:outkine-blue-950">
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <Button
              disabled={isPending || !user}
              type="submit"
              className="w-full bg-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="text-center  animate-spin" />
                </>
              ) : (
                "add transaction"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
};

export default AddTransaction;

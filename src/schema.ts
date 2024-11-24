import * as z from "zod";

export const registerSchema = z.object({
  names: z.string().min(2, {
    message: "names must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});
export const loginSchema = z.object({
  email: z.string().email().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  code: z.optional(
    z.string().min(2, {
      message: "email must be at least 2 characters.",
    })
  ),
});

export const transactionSchema = z.object({
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Amount must be a valid number and at least 1.",
    }),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
});
export const addTransactionSchema = z.object({
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Amount must be a valid number and at least 1.",
    }),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userId: z.string().min(2, {
    message: "userId must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

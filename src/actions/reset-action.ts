"use server";
import * as z from "zod";
import { ResetSchema } from "@/schema";
import { getUserByEmail } from "./user-actions";
// import { sendPasswordResetEmail
import { v4 as uuid4 } from "uuid";
import prisma from "@/prisma/prisma";
import { sendPasswordResetEmail } from "./mail";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 60);

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(value);

  if (!validatedField.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};

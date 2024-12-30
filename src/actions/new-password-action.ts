"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUserByEmail } from "./user-actions";
import { NewPasswordSchema } from "@/schema";
import prisma from "@/prisma/prisma";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  const existingUser = await getUserByEmail(existingToken?.email as string);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({
    where: { token },
  });
  return { success: "Password updated!" };
};

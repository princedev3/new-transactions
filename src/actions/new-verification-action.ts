"use server";
import { redirect } from "next/navigation";
import { getUserByEmail } from "./user-actions";
import prisma from "@/prisma/prisma";

export const newVerificationAction = async (token: string) => {
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  if (!existingToken) {
    return { error: "Token has expired!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  return { success: "Email verified!" };
};

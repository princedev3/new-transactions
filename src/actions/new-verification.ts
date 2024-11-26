"use server";

import prisma from "@/prisma/prisma";
import { getVerificationTokenByToken } from "./token";
import { getUserByEmail } from "./user-actions";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

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
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verified!" };
  } catch (error) {
    return { error: "Email verified! not successfull" };
  }
};

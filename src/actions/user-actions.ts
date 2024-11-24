"use server";
import prisma from "@/prisma/prisma";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationEmail = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationEmail;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

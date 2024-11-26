"use server";
import { v4 as uuid4 } from "uuid";
import { getVerificationTokenByEmail } from "./user-actions";
import prisma from "@/prisma/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 5);

  const getUserByTokenEmail = await getVerificationTokenByEmail(email);
  if (getUserByTokenEmail) {
    await prisma.verificationToken.delete({
      where: {
        id: getUserByTokenEmail.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

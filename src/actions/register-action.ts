"use server";
import { registerSchema } from "@/schema";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./user-actions";
import prisma from "@/prisma/prisma";
import { generateVerificationToken } from "./token";
import { sendVerificationEmail } from "./mail";

export const registerAction = async (data: {
  names: string;
  email: string;
  password: string;
}) => {
  try {
    const validatedFields = registerSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid field!" };
    }
    const { names, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (existingUser.emailVerified) {
        return { error: "User already exists and email is verified!" };
      }
      return { error: "User already exists!" };
    }
    await prisma.user.create({
      data: {
        name: names,
        email,
        password: hashedPassword,
      },
    });
    const verifcationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verifcationToken.email, verifcationToken.token);

    return { success: "Verification email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "registration failed!" };
  }
};

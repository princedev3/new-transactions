"use server";
import { loginSchema } from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./user-actions";
import { generateVerificationToken } from "./token";
import { sendVerificationEmail } from "./mail";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (value: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(value);
    if (!validatedFields.success) {
      return { error: "Invalid field!" };
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email) {
      return { error: "Invalid credentials!" };
    }
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Email sent!" };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

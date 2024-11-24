"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { addTransactionSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddTransactionAction = async (
  values: z.infer<typeof addTransactionSchema>
) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "failed to add transaction" };
    }
    if (session?.user?.id !== values.userId) {
      return { error: "failed to add transaction" };
    }
    await prisma.transaction.create({
      data: {
        userId: values.userId,
        amount: values.amount,
        title: values.title,
        type: values.type,
      },
    });
    revalidatePath("/");
    return { success: "transaction added successfully" };
  } catch (error) {
    return { error: "failed to add transaction" };
  }
};
